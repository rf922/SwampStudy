import { postUser, register, login } from "../controllers/userController";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", postUser);

userRouter.post("/login", login);

userRouter.post("/register", register);

export default userRouter;
