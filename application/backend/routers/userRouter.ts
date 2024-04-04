import { isAuthenticated } from "./../middleware/isAuthenticated";
import {
  postUser,
  register,
  login,
  logout,
} from "../controllers/userController";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", isAuthenticated, postUser);

userRouter.post("/login", login);

userRouter.post("/register", register);

userRouter.post("/logout", isAuthenticated, logout);

export default userRouter;
