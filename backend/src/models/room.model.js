module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      number: {
        type: Sequelize.STRING
      }
    });

    sequelize.models.serie.hasMany(Room, { as: "rooms" });
    Room.belongsTo(sequelize.models.serie, { foreignKey: 'serieId' });
    
    return Room;
  };