module.exports = (sequelize, Sequelize) => {
  const Juror = sequelize.define("juror", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    master: {
      type: Sequelize.BOOLEAN,
    },
    infoRelated: {
      type: Sequelize.STRING,
    },
    activated: {
      type: Sequelize.BOOLEAN,
    },
  });

  sequelize.models.serie.hasMany(Juror, { as: "jurors" });
  Juror.belongsTo(sequelize.models.serie, { foreignKey: "serieId" });

  return Juror;
};
