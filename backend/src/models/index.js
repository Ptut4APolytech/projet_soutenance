const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.series = require("./serie.model.js")(sequelize, Sequelize);
db.jurors = require("./juror.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.slots = require("./slot.model.js")(sequelize, Sequelize);
db.constraints = require("./constraint.model.js")(sequelize, Sequelize);
db.juries = require("./jury.model.js")(sequelize, Sequelize);
db.defenses = require("./defense.model.js")(sequelize, Sequelize);

module.exports = db;
// to use the models, import the db object and use it like this:
// const db = require("../models");
// db.series.findAll().then(series => {
//     console.log(series);
// });