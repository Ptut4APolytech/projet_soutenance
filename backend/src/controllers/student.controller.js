const db = require("../models");

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.lastName ||
    !req.body.firstName ||
    !req.body.email ||
    !req.body.number
  ) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  // Create a Student
  const student = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    number: req.body.number,
  };

  // Save Student in the database
  db.students
    .create(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  db.students
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};

// Find a single Student with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  db.students
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Studient with id=${id}.`
          ,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Student with id=${id}.`,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.students
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or the request body (req.body) is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Student with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.students
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Studient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Studient with id=" + id,
      });
    });
};
