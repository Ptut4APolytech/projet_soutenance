module.exports = (sequelize, Sequelize) => {
  const Serie = sequelize.define("serie", {
    label: {
      type: Sequelize.STRING,
    },
  });

  return Serie;
};
