const express = require("express");

const routes = express.Router();


routes.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

module.exports = routes;


