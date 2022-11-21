module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
  });

  sequelize.models.serie.hasMany(Student, { as: "students" });
  Student.belongsTo(sequelize.models.serie, { foreignKey: "serieId" });

  sequelize.models.juror.hasMany(Student, { as: "studentsAsMaster" });
  Student.belongsTo(sequelize.models.juror, {
    foreignKey: "masterId",
    as: "master",
  });

  sequelize.models.juror.hasMany(Student, { as: "studentsAsTutor" });
  Student.belongsTo(sequelize.models.juror, {
    foreignKey: "tutorId",
    as: "tutor",
  });

  return Student;
};
