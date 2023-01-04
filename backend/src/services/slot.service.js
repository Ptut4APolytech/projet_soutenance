const db = require("../models");

exports.createMany = (slots, serieId) => {
  slots.forEach((slot) => {
    slot.serieId = serieId;
  });
  return db.slots.bulkCreate(slots);
};


exports.getserieId = (serieId) => {
  return db.slots.findAll({where: { serieId: serieId }});
};
