import express, { Router, Request, Response } from 'express'

const RoomController = require('./POSTGRESQL/controllers/RoomController')
const UserController = require('./POSTGRESQL/controllers/UserController')
const routes: Router = express.Router();

routes.get("/", (req: Request, res: Response):void => {
  res.send({ response: "Server is up and running." }).status(200);
});

export default routes


