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
