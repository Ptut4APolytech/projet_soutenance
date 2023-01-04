const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const constraint = require("../controllers/constraint.controller.js");
  const router = require("express").Router();

  router.post(
    "/",
    [authJwt.verifyToken],
    constraint.createOrUpdate);

  app.use("/api/constraint", router);
};
