module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        acquire: 30000,
        idle: 10000,
    }
}