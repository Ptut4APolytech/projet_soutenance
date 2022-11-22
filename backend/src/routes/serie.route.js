module.exports = (app) => {
  const serie = require("../controllers/serie.controller.js");
  const router = require("express").Router();

  router.post("/", serie.create);

  app.use("/api/serie", router);
};
