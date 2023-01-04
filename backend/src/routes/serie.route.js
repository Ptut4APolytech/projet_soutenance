const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const serie = require("../controllers/serie.controller.js");
  const router = require("express").Router();

  router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    serie.create
    );

  router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    serie.getAll
    );

  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    serie.delete
  );

  app.use("/api/serie", router);
};
