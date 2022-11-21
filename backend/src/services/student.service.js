const db = require("../models");

exports.createMany = (students, serieId) => {
  students.forEach((student) => {
    student.serieId = serieId;
  });
  return db.students.bulkCreate(students);
};
