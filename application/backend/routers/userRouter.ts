import express from "express";
import { postUser } from "../controllers/userController";
//es6 syntax for import exports

const userRouter = express.Router();

userRouter.post("/", postUser);

export default userRouter;
