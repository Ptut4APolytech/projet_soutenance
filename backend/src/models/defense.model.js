// defense stands for "soutenance" in french
module.exports = (sequelize, Sequelize) => {
    const Defense = sequelize.define("defense", { });

    sequelize.models.jury.hasMany(Defense, { as: "defenses" });
    Defense.belongsTo(sequelize.models.jury, { foreignKey: 'juryId', as: 'jury' });

    sequelize.models.slot.hasMany(Defense, { as: "defenses" });
    Defense.belongsTo(sequelize.models.slot, { foreignKey: 'slotId', as: 'slot' });

    sequelize.models.room.hasMany(Defense, { as: "defenses" });
    Defense.belongsTo(sequelize.models.room, { foreignKey: 'roomId', as: 'room' });

    sequelize.models.student.hasOne(Defense, { as: "defense" });
    Defense.belongsTo(sequelize.models.student, { foreignKey: 'studentId', as: 'student' });
    
    return Defense;
  };