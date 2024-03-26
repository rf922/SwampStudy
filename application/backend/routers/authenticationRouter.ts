import { checkSession } from "../controllers/authenticationController";
import express from "express";

const authenticationRouter = express.Router();

authenticationRouter.get("/checkSession", checkSession);

export default authenticationRouter;
