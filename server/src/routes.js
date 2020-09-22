const express = require("express");

const routes = express.Router();


routes.get("/healthcheck", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

// ABSTRACTION FOR ACCESSING DATABASE:

/*
routes.post('/rooms', RoomController.store)
routes.get('/rooms', RoomController.list)
routes.get('/rooms/:id', RoomController.getOne)

routes.post('/users', UserController.store)
routes.get('/users', UserController.list)
*/

module.exports = routes;


