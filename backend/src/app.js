const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
let corsOptions = { origin: "http://localhost:4200" };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const db = require("./models");
// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
    initDb();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = app;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/serie.route")(app);
require("./routes/constraint.route")(app);

function initDb() {
    if (db.roles.findAll().length != 2) return;
    db.roles.destroy();
    db.roles.create({ id: 1, name: "user" });
    db.roles.create({ id: 2, name: "admin" });
}
