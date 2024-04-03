import { getMatch } from "../controllers/matchController";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const matchRouter = express.Router();

matchRouter.get("/", isAuthenticated,getMatch);

export default matchRouter;
