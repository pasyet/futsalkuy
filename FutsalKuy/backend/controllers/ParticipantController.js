const { Participant, Event, User } = require("../models");

class ParticipantController {

  static getParticipant(req, res, next) {
    Participant.findAll({
        include: [Event,User]
    })
    .then((data) => {
        // console.log(data);
        res.status(200).json({
            Result :data
        });
    })
    .catch((error) => {
        console.log(error);
        next(error)
    });
}

  static async postParticipant(req, res) {
    const { eventId, userId, role } = req.body;
    try {
      if (!eventId || !userId || !role) throw { name: "Bad Request" };
      const check = await Event.findOne({
        where: { id: eventId, status: "waiting" },
      });
      const isParticipant = await Participant.findOne({
        where: { eventId, userId },
      });
      if (!check) throw { name: "Not Found" };
      const count = await Participant.count({ where: { eventId } });
      console.log(count);
      if (count == 10) throw { name: "Max" };
      else if (isParticipant)
        res.status(400).json({ message: "Already participant" });
      else {
        const result = await Participant.create({ eventId, userId, role });
        res.status(201).json({ message: "Participant join success" });
      }
    } catch (error) {
      console.log(error);
      if (error.name == "Bad Request")
        res.status(400).json({ message: "Bad Request" });
      else if (error.name == "Not Found")
        res
          .status(404)
          .json({ message: "Event with status waiting not found" });
      else if (error.name == "Max")
        res.status(400).json({ message: "Event participant is max" });
      else res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ParticipantController;
