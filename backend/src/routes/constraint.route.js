module.exports = (app) => {
  const constraint = require("../controllers/constraint.controller.js");
  const router = require("express").Router();

  router.post("/", constraint.createOrUpdate);

  app.use("/api/constraint", router);
};
