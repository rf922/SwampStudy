import express from "express";
import { resolveClassScheduleController } from "../middleware/resolveControllers";

const classScheduleRouter = express.Router();

classScheduleRouter.use(resolveClassScheduleController);

classScheduleRouter.post("/", (req, _res) =>
  req.classScheduleController.ping(req, _res),
);

export default classScheduleRouter;
