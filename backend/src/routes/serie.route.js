module.exports = (app) => {
  const serie = require("../controllers/serie.controller.js");
  const router = require("express").Router();

  router.post("/", serie.create);

  router.get("/", serie.getAll);

  router.delete("/:id", serie.delete);

  app.use("/api/serie", router);
};
