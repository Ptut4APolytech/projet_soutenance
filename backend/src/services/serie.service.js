const db = require("../models");

const studentService = require("../services/student.service");
const slotService = require("../services/slot.service");
const jurorService = require("../services/juror.service");
const roomService = require("../services/room.service");

exports.create = (serie) => {
  db.series
    .create({ label: serie.label })
    .then(async (res) => {
      await slotService.createMany(serie.slots, res.id).then((r) => {
        res.slots = r;
      });

      await roomService.createMany(serie.rooms, res.id).then((r) => {
        res.rooms = r;
      });

      await jurorService.createMany(serie.jurors, res.id).then((r) => {
        res.jurors = r;
      });

      serie.students.forEach((student) => {
        let jurors = serie.jurors.findAll(
          (j) => j.studentNumber == student.number
        );
        student.masterId = res.jurors.find(
          (j) => j.dataValues.email == jurors.find((j2) => j2.master).email
        ).id;

        student.tutorId = res.jurors.find(
          (j) => j.dataValues.email == jurors.find((j2) => !j2.master).email
        ).id;
      });

      await studentService.createMany(serie.students, res.id).then((r) => {
        res.students = r;
      });

      return res;
    })
    .catch((err) => {
      throw err;
    });
};

exports.getAll = async () => {
  let series = await db.series
    .findAll({
      include: [
        {
          model: db.slots,
          as: "slots",
        },
        {
          model: db.rooms,
          as: "rooms",
        },
        {
          model: db.jurors,
          as: "jurors",
          include: [
            {
              model: db.constraints,
              as: "constraints",
            },
          ],
        },
        {
          model: db.students,
          as: "students",
        },
      ],
    })
    .then((res) => {
      return res;
    });

  series.forEach((serie) => {
    serie.dataValues.startDate = new Date(
      Math.min.apply(
        null,
        serie.slots.map((s) => s.start)
      )
    ).toLocaleDateString("fr");
    serie.dataValues.endDate = new Date(
      Math.max.apply(
        null,
        serie.slots.map((s) => s.end)
      )
    ).toLocaleDateString("fr");
  });

  return series;
};

exports.delete = async (id) => {
  await db.series.destroy({
    where: {
      id: id,
    },
  });
};
