import { getMatch } from "../controllers/matchController";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const matchRouter = express.Router();

matchRouter.get("/", getMatch);

export default matchRouter;
