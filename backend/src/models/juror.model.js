module.exports = (sequelize, Sequelize) => {
    const Juror = sequelize.define("juror", {
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        master: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            nullable: false,
        },
        infoRelated: {
            type: Sequelize.BOOLEAN,
            nullable: true,
        },
        activated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            nullable: false,
        },
    });

    return Juror;
};
