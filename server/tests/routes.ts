import express, { Router, Request, Response } from 'express'

const RoomController = require('./POSTGRESQL/controllers/RoomController')
const routes: Router = express.Router();


routes.post('/rooms', RoomController.store)
routes.get('/rooms', RoomController.list)

routes.get("/", (req: Request, res: Response):void => {
  res.send({ response: "Server is up and running." }).status(200);
});

export default routes


