import express, { Router, Request, Response } from 'express'

const routes: Router = express.Router();

routes.get("/", (req: Request, res: Response):void => {
  res.send({ response: "Server is up and running." }).status(200);
});

export default routes


