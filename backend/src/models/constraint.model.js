module.exports = (sequelize, Sequelize) => {
  const Constraint = sequelize.define("constraint", {
    available: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Constraint;
};
