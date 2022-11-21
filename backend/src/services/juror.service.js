const db = require("../models");

exports.createMany = (jurors, serieId) => {
    jurors.forEach(juror => {
        juror.serieId = serieId;
    });
    return db.jurors.bulkCreate(jurors);
};
