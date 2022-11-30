const constraintService = require("../services/constraint.service");

exports.createOrUpdate = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  req.body.forEach((c) => {
    if (!c.slotId || c.available == undefined || !c.jurorId) {
      res.status(400).send({
        message: "All fields are required!",
      });
      return;
    }
  });

  try {
    await constraintService.createOrUpdateMany(req.body).then((r) => {
      res.status(200).send(r);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
};
