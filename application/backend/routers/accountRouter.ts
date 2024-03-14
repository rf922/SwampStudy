import express from "express";
import { getAccount, postAccount } from "../controllers/accountController.js";

const accountRouter = express.Router();

accountRouter.get("/:id", getAccount);
accountRouter.post("/", postAccount);
export default accountRouter;
