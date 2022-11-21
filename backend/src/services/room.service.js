const db = require("../models");

exports.createMany = (rooms, serieId) => {
    rooms.forEach(room => {
        room.serieId = serieId;
    });
    return db.rooms.bulkCreate(rooms);
};
