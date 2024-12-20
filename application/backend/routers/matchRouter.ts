import express from "express";
import { resolveMatchController } from "./../middleware/resolveControllers";
const matchRouter = express.Router();
matchRouter.use(resolveMatchController);

matchRouter.get("/", (req, _res) => req.matchController.getMatches(req, _res));

matchRouter.get("/userMatch", (req, _res) =>
  req.matchController.getMatch(req, _res),
);

matchRouter.post("/meeting", (req, _res) =>
  req.matchController.updateMatchDate(req, _res),
);

export default matchRouter;
