const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.series = require("./serie.model.js")(sequelize, Sequelize);
db.jurors = require("./juror.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.slots = require("./slot.model.js")(sequelize, Sequelize);
db.constraints = require("./constraint.model.js")(sequelize, Sequelize);
db.juries = require("./jury.model.js")(sequelize);
db.defenses = require("./defense.model.js")(sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.refreshTokens = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.series.hasMany(db.jurors, { as: "jurors" });
db.jurors.belongsTo(db.series, { foreignKey: "serieId" });

db.series.hasMany(db.students, { as: "students" });
db.students.belongsTo(db.series, { foreignKey: "serieId" });

db.jurors.hasMany(db.students, { as: "studentsAsMaster" });
db.students.belongsTo(db.jurors, {
  foreignKey: "masterId",
  as: "master",
});

db.jurors.hasMany(db.students, { as: "studentsAsTutor" });
db.students.belongsTo(db.jurors, {
  foreignKey: "tutorId",
  as: "tutor",
});

db.students.removeAttribute("jurorId");

db.series.hasMany(db.rooms, { as: "rooms" });
db.rooms.belongsTo(db.series, { foreignKey: "serieId" });

db.series.hasMany(db.slots, { as: "slots" });
db.slots.belongsTo(db.series, { foreignKey: "serieId" });

db.jurors.hasMany(db.constraints, { as: "constraints" });
db.constraints.belongsTo(db.jurors, { foreignKey: "jurorId" });

db.slots.hasMany(db.constraints, { as: "constraints" });
db.constraints.belongsTo(db.slots, { foreignKey: "slotId" });

db.series.hasMany(db.juries, { as: "jurys" });
db.juries.belongsTo(db.series, {
  foreignKey: "serieId",
  as: "serie",
});

db.jurors.hasMany(db.juries, { as: "jurysAsMaster" });
db.juries.belongsTo(db.jurors, {
  foreignKey: "masterId",
  as: "master",
});

db.jurors.hasMany(db.juries, { as: "jurysAsTeacher1" });
db.juries.belongsTo(db.jurors, {
  foreignKey: "teacher1Id",
  as: "teacher1",
});

db.jurors.hasMany(db.juries, { as: "jurysAsTeacher2" });
db.juries.belongsTo(db.jurors, {
  foreignKey: "teacher2Id",
  as: "teacher2",
});

db.juries.removeAttribute("jurorId");

db.juries.hasMany(db.defenses, { as: "defenses" });
db.defenses.belongsTo(db.juries, {
  foreignKey: "juryId",
  as: "jury",
});

db.slots.hasMany(db.defenses, { as: "defenses" });
db.defenses.belongsTo(db.slots, {
  foreignKey: "slotId",
  as: "slot",
});

db.rooms.hasMany(db.defenses, { as: "defenses" });
db.defenses.belongsTo(db.rooms, {
  foreignKey: "roomId",
  as: "room",
});

db.students.hasOne(db.defenses, { as: "defense" });
db.defenses.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student",
});

db.users.hasMany(db.jurors, { as: "juror" });
db.jurors.belongsTo(db.users, { foreignKey: "userId" });

db.users.hasOne(db.refreshTokens, { as: "refreshToken" });
db.refreshTokens.belongsTo(db.users, { foreignKey: "userId" });

db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
db.users.belongsToMany(db.roles, {
through: "user_roles",
foreignKey: "userId",
otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

module.exports = db;
// to use the models, import the db object and use it like this:
// const db = require("../models");
// db.series.findAll().then(series => {
//     console.log(series);
// });
