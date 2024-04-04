import { postLike } from "../controllers/likeController";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const likeRouter = express.Router();

likeRouter.post("/", isAuthenticated, postLike);

export default likeRouter;
