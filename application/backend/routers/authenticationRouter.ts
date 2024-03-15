import { checkSession } from "../controllers/authenticationController";
import express from "express";

const router = express.Router();

router.get("/checkSession", checkSession);

export default router;
