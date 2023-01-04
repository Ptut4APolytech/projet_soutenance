module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
      unique: true,
    },
  });

  return Student;
};
