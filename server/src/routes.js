const express = require("express");

const routes = express.Router();

<<<<<<< HEAD
routes.get("/", (req, res) => {
=======

routes.get("/healthcheck", (req, res) => {
>>>>>>> 26d6dbc944495d3c0cdfca44cde9aaf67e241b3d
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


