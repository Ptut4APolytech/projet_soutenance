module.exports = (sequelize, Sequelize) => {
  const Slot = sequelize.define("slot", {
    start: {
      type: Sequelize.DATE,
    },
    end: {
      type: Sequelize.DATE,
    },
  });

  sequelize.models.serie.hasMany(Slot, { as: "slots" });
  Slot.belongsTo(sequelize.models.serie, { foreignKey: "serieId" });

  return Slot;
};
