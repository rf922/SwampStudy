import {
  getAccount,
  details,
  postAccount,
} from "../controllers/accountController";
import express from "express";

/**
 * to - do sensitive routes here will use isAuthenticated middle ware
 */

const accountRouter = express.Router();
accountRouter.get("/details", details);
accountRouter.get("/:id", getAccount);
accountRouter.post("/", postAccount);

export default accountRouter;
