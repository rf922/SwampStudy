import { getMatch } from "../controllers/matchController";
import express from "express";

const matchRouter = express.Router();

matchRouter.get("/", getMatch);

export default matchRouter;