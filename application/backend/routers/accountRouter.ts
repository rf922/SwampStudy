import { getAccount, postAccount } from "../controllers/accountController";
import express from "express";

const accountRouter = express.Router();

accountRouter.get("/:id", getAccount);
accountRouter.post("/", postAccount);

export default accountRouter;
