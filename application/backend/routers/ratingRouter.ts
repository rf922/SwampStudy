import { postRating, getRating } from "../controllers/ratingController";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const ratingrouter = express.Router();

ratingrouter.post("/", postRating);
ratingrouter.get("/", getRating);

export default ratingrouter;
