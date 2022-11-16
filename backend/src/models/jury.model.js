module.exports = (sequelize, Sequelize) => {
    const Jury = sequelize.define("jury", { });

    sequelize.models.serie.hasMany(Jury, { as: "jurys" });
    Jury.belongsTo(sequelize.models.serie, { foreignKey: 'serieId', as: 'serie' });

    sequelize.models.juror.hasMany(Jury, { as: "jurysAsMaster" });
    Jury.belongsTo(sequelize.models.juror, { foreignKey: 'masterId', as: 'master' });

    sequelize.models.juror.hasMany(Jury, { as: "jurysAsTeacher1" });
    Jury.belongsTo(sequelize.models.juror, { foreignKey: 'teacher1Id', as: 'teacher1' });

    sequelize.models.juror.hasMany(Jury, { as: "jurysAsTeacher2" });
    Jury.belongsTo(sequelize.models.juror, { foreignKey: 'teacher2Id', as: 'teacher2' });

    Jury.removeAttribute('jurorId');
    
    return Jury;
  };