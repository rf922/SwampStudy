import {
  getAccount,
  details,
  postAccount,
} from "../controllers/accountController";
import express from "express";

const accountRouter = express.Router();
accountRouter.get("/details", details);
accountRouter.get("/:id", getAccount);
accountRouter.post("/", postAccount);

export default accountRouter;
