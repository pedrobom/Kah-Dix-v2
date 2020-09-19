const express = require("express");

const RoomController = require('./POSTGRESQL/controllers/RoomController')
const routes = express.Router();

//#####TESTE DE POST (USANDO INSOMNIA)###
routes.post('/rooms', RoomController.store)
routes.get('/rooms', RoomController.list)
//#######################################

routes.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

module.exports = routes;


