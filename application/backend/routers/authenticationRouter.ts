import express from "express";
import { resolveAuthenticationController } from "./../middleware/resolveControllers";

const authenticationRouter = express.Router();
// use middleware to resolve and attach the controller to req
authenticationRouter.use(resolveAuthenticationController);

authenticationRouter.get("/checkSession", (req, _res) =>
  req.authenticationController.checkSession(req, _res),
);

export default authenticationRouter;
