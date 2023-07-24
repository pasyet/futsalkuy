const { Field, Provider } = require("../models");

class FieldController {
  static async GetAllFields(req, res, next) {
    try {
      const fields = await Field.findAll({
        include: [
          {
            model: Provider,
            attributes: ["provider_name", "location"],
          },
        ],
      });
      res.status(200).json({
        fields,
      });
    } catch (error) {}
  }

  static getFieldById(req, res, next) {
    Field.findByPk(req.params.id, {
      include: [Provider],
    })
      .then((data) => {
        if (!data) throw { name: "FieldNotFound" };
        res.status(200).json({
          Field: data,
        });
      })
      .catch((error) => {
        console.log(error, 'by id');
        next(error);
      });
  }
}

module.exports = FieldController;
