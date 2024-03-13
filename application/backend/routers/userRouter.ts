import {
  postUser,
  register,
  login,
  loginStatus,
  logout,
} from "../controllers/userController";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", postUser);

userRouter.post("/login", login);

userRouter.post("/register", register);

userRouter.post("/logout", logout);

userRouter.get("/loginstatus", loginStatus);

export default userRouter;
