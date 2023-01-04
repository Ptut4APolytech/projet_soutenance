module.exports = (sequelize, Sequelize) => {
  const Slot = sequelize.define("slot", {
    start: {
      type: Sequelize.DATE,
    },
    end: {
      type: Sequelize.DATE,
    },
  });

  return Slot;
};
