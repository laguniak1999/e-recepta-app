const PrescriptionRouter = (app) => {
  const DatabaseHandler = require("./database/DatabaseHandler");
  const PrescriptionDocumentHandler = require("./PrescriptionDocumentHandler");
  const Login = require("./database/Login");

  var router = require("express").Router();

  router.post("/add/", DatabaseHandler.create);
  router.delete("/add/", DatabaseHandler.deleteAll);
  router.get("/add/", DatabaseHandler.getAll);
  router.post("/add/:id", DatabaseHandler.getAll);
  router.post("/user", DatabaseHandler.createUser);
  router.get("/user", DatabaseHandler.getAllUsers);
  router.post("/user/:id", DatabaseHandler.getUser);
  router.post("/add/document/:id", function (req, res) {
    res.send(
      PrescriptionDocumentHandler.getPrescriptionDocument(
        req.body.selectedOption
      )
    );
  });
  router.post("/login", Login.logIn);
  app.use("/api", router);
};

module.exports = {
  PrescriptionRouter,
};
