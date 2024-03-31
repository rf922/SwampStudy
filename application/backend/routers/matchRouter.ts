import express from "express";
import { resolveMatchController } from "./../middleware/resolveControllers";
const matchRouter = express.Router();
matchRouter.use(resolveMatchController);

matchRouter.get("/", (req, _res) => req.matchController.getMatch(req, _res));

export default matchRouter;
