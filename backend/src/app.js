const express = require("express")
const app = express()

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors")
let corsOptions = { origin: "http://localhost:8081" }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dbConfig = require("./config/db.config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// TODO: add models here

module.exports = app

app.get("/", (req, res) => {
    res.json({ message: "Coucou c'est du JSON" }) // TODO: remove this line
})