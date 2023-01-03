const db = require("../models");

exports.createOrUpdateMany = async (constraints) => {
  if (constraints.length > 0) {
    return await db.constraints
      .destroy({
        where: {
          jurorId: constraints[0].jurorId,
        },
      })
      .then(async () => {
        return await db.constraints.bulkCreate(constraints);
      });
  }
};

exports.checkJurorSlot = async (idJuror, idSlot) => {
  try {
    return await db.constraints.findAll({ where: { jurorId : idJuror , slotId : idSlot }});
  } catch (error) {
    console/log("Erreur pas de constraint pour ce juror sur ce slot " +error);
    return [{available:false}]
  }
  
};