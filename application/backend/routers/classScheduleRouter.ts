import express from "express";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import { resolveClassScheduleController } from "../middleware/resolveControllers";

const classScheduleRouter = express.Router();

classScheduleRouter.use(resolveClassScheduleController);

classScheduleRouter.post("/", (req, _res) =>
  req.classScheduleController.ping(req, _res),
);

classScheduleRouter.post("/update", (req, _res) =>
  req.classScheduleController.updateUserClassSchedule(req, _res),
);

classScheduleRouter.get("/", isAuthenticated, (req, _res) =>
  req.classScheduleController.getClassSchedule(req, _res),
);

export default classScheduleRouter;
