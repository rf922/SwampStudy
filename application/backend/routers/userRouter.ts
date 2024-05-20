import { isAuthenticated } from "./../middleware/isAuthenticated";
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

userRouter.get("/profiles", isAuthenticated, (req, _res) =>
  req.userController.getUserProfiles(req, _res),
);

userRouter.post("/report/:userId", isAuthenticated, (req, _res) =>
  req.userController.reportUserProfile(req, _res),
);

userRouter.post("/recoverPassword", (req, _res) =>
  req.userController.recoverPassword(req, _res),
);

userRouter.post("/resetPassword", (req, _res) =>
  req.userController.resetPassword(req, _res),
);

userRouter.post("/verifyToken", (req, _res) =>
  req.userController.verifyToken(req, _res),
);

export default userRouter;
