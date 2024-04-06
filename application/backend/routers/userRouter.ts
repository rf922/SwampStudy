import { resolveUserController } from "./../middleware/resolveControllers";
import express from "express";

const userRouter = express.Router();
// resolve and attach our controller
userRouter.use(resolveUserController);

userRouter.post("/login", (req, _res) => req.userController.login(req, _res));

userRouter.post("/register", (req, _res) =>
  req.userController.register(req, _res),
);

userRouter.post("/logout", (req, _res) => req.userController.logout(req, _res));

export default userRouter;
