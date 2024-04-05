import { postLike } from "../controllers/likeController";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const likeRouter = express.Router();

likeRouter.post("/", postLike);

export default likeRouter;
