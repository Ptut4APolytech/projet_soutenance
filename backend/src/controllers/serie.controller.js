const serieService = require("../services/serie.service");
require("../utils/array.utils");

// Create and Save a new Student
exports.create = async (req, res) => {
  // Validate request
  if (
    !req.body.label ||
    !req.body.slots ||
    !req.body.jurors ||
    !req.body.rooms
  ) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  // Create a Serie
  const serie = {
    label: req.body.label,
    slots: req.body.slots,
    jurors: req.body.jurors,
    students: req.body.students,
    rooms: req.body.rooms,
  };

  try {
    await serieService.create(serie).then((r) => {
      let corruptedStudents = r.students.filter(
        (s) => s.masterId == undefined || s.tutorId == undefined
      );
      if (corruptedStudents.length > 0) {
        res.status(202).send({
          message:
            "Les étudiants suivants n'ont pas de MAP ou de tuteur : " +
            corruptedStudents.map((s) => s.number).join(", "),
        });
      } else {
        res.status(201).send(r);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    await serieService.getAll().then((r) => {
      res.send(r);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving series.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await serieService.delete(req.params.id).then((r) => {
      res.send(r);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting series.",
    });
  }
};
