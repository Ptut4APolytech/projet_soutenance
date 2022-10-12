const express = require("express")
const app = express()

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors")
let corsOptions = { origin: "http://localhost:8081" }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Sequelize = require("sequelize")
const sequelizeConfig = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelizeConfig;

// TODO: add models here

module.exports = app

app.get("/", (req, res) => {
    res.json({ message: "Coucou c'est du JSON" }) // TODO: remove this line
})