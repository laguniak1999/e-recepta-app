const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
const mysql = require("mysql");
const util = require("util");
var soap = require("soap");
const fs = require("fs");
const { PrescriptionRouter } = require("./routers");
const routers = require("./routers");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);

PrescriptionRouter(app);

app.listen(3001, () => {
  console.log("running on port 3001");
});
