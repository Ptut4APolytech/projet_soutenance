module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    number: {
      type: Sequelize.STRING,
    },
  });

  return Room;
};
