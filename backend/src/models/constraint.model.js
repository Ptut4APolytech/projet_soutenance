module.exports = (sequelize, Sequelize) => {
    const Constraint = sequelize.define("constraint", {
      available: {
        type: Sequelize.BOOLEAN
      }
    });

    sequelize.models.juror.hasMany(Constraint, { as: "constraints" });
    Constraint.belongsTo(sequelize.models.juror, { foreignKey: 'jurorId' });

    sequelize.models.slot.hasMany(Constraint, { as: "constraints" });
    Constraint.belongsTo(sequelize.models.slot, { foreignKey: 'slotId' });
    
    return Constraint;
  };