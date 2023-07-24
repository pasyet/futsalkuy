const { default: axios } = require("axios");
const { Event, Field } = require("../models");

class PaymentController {
  static async createPayment(req, res) {
    const { fieldId, eventId } = req.body;
    const timestamp = +new Date();
    try {
      const event = await Event.findOne({ where: { id: eventId } });
      const field = await Field.findOne({ where: { id: fieldId } });
      if (!event || !field) throw { name: "Invalid Input" };
      const { data } = await axios({
        method: "post",
        url: `https://app.sandbox.midtrans.com/snap/v1/transactions`,
        headers: {
          Authorization:
            "Basic U0ItTWlkLXNlcnZlci1vRnBwTEU0cmhrQVQyU3NBeF9hdUw4Y1A6",
        },
        data: {
          transaction_details: {
            order_id: `ORDER-101-${timestamp}`,
            gross_amount: field.price,
          },
          credit_card: {
            secure: true,
          },
        },
      });
      const update = await Event.update(
        { orderId: `ORDER-101-${timestamp}` },
        { where: { id: eventId } }
      );
      console.log(update, `ORDER-101-${timestamp}`, eventId);
      res.send({ redirect_url: data.redirect_url });
    } catch (error) {
      if (error.name == "Invalid Input")
        res.status(400).json({ message: "invalid input" });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getPaymentStatus(req, res) {
    const { eventId } = req.params;
    // Cari database event > orderId

    try {
      const order = await Event.findOne({ where: { id: eventId } });
      if (!order) throw { name: "Invalid Input" };
      const { data } = await axios({
        method: "get",
        url: `https://api.sandbox.midtrans.com/v2/${order.orderId}/status`,
        headers: {
          Authorization:
            "Basic U0ItTWlkLXNlcnZlci1vRnBwTEU0cmhrQVQyU3NBeF9hdUw4Y1A6",
        },
      });
      console.log(order.status, data, order.orderId);
      if (order.status != "waiting" && data.transaction_status == "settlement")
        await Event.update({ status: "waiting" }, { where: { id: eventId } });

      res.send({
        transaction_status: data.transaction_status
          ? data.transaction_status
          : "waiting payment method",
      });
    } catch (error) {
      console.log(error);
      if (error.name == "Invalid Input")
        res.status(400).json({ message: "invalid input" });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = PaymentController;
