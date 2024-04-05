import { postRating, getRating } from "../controllers/ratingController";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const ratingRouter = express.Router();

ratingRouter.post("/", isAuthenticated, postRating);
ratingRouter.get("/", isAuthenticated, getRating);

export default ratingRouter;
