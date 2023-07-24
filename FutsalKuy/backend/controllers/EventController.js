const { Event, Field, User, Provider, Participant } = require("../models");

class EventController {
  static async AllEvents(req, res, next) {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: Field,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: Provider,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        Result: events,
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetEvent(req, res, next) {
    try {
      const event = await Event.findByPk(req.params.eventId, {
        include: [
          {
            model: Field,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: Provider,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
      });
      if (!event) throw { name: "DataNotFound" };
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }

  static async UpdateStatus(req, res, next) {
    const { status } = req.body;
    try {
      const event = await Event.findByPk(req.params.eventId);
      if (!event) throw { name: "DataNotFound" };
      const statusUpdate = await Event.update(
        { status },
        { where: { id: req.params.eventId }, returning: true }
      );
      console.log(statusUpdate);
      res.status(200).json({ status: statusUpdate[1][0] });
    } catch (error) {
      next(error);
    }
  }

  static async postEvent(req, res, next) {
    const { event_name, date, time, people, fieldId, userId } = req.body;
    try {
      const event = await Event.create({
        event_name,
        date,
        time,
        people,
        fieldId,
        userId,
      });
      res.status(201).json(event);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = EventController;
