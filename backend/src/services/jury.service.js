const db = require("../models");


exports.getAll = async (id) => {
    let juries = await db.juries 
    .findAll({
      where: { serieId: id },
      include: [
        {
          model: db.jurors,
          as: "master",
          include: [
            {
              model: db.constraints,
              as: "constraints",
            },
          ],
        },
        {
          model: db.jurors,
          as: "teacher1",
          include: [
            {
              model: db.constraints,
              as: "constraints",
            },
          ],
        },
        {
          model: db.jurors,
          as: "teacher2",
          include: [
            {
              model: db.constraints,
              as: "constraints",
            },
          ],
        },
      ],
    }).then((res) => {
      return res;
    });

    return juries;
  };