module.exports = (sequelize, Sequelize) => {
    const Juror = sequelize.define("juror", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      infoRelated: {
        type: Sequelize.STRING
      }
    });

    sequelize.models.serie.hasMany(Juror, { as: "jurors" });
    Juror.belongsTo(sequelize.models.serie, { foreignKey: 'serieId' });
    
    return Juror;
  };