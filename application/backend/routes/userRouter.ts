import { login, register } from "../controllers/userControllers";
import express from "express";

const userRouter = express.Router();

userRouter.post("/login", login);

userRouter.post("/register", register);

export default userRouter;
