import { postUser } from "../controllers/userController";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", postUser);

//userRouter.post("/register", register);

export default userRouter;
