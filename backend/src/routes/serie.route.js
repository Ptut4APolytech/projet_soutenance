module.exports = (app) => {
  const serie = require("../controllers/serie.controller.js");
  const router = require("express").Router();

  router.post("/", serie.create);

  router.get("/", serie.getAll);

  router.get("/:id", serie.getOne);

  router.get("/:id/buildPlanning", serie.buildPlanning);

  router.delete("/:id", serie.delete);

  app.use("/api/serie", router);
};
