import { isAuthenticated } from "./../middleware/isAuthenticated";
import {
  getAccount,
  details,
  postAccount,
  deleteAccount,
  updateAccount,
} from "../controllers/accountController";
import express from "express";

/**
 * to - do sensitive routes here will use isAuthenticated middle ware
 */

const accountRouter = express.Router();
accountRouter.get("/details", details);
accountRouter.get("/:id", getAccount);
accountRouter.post("/", postAccount);

/**
 * protect sensitive routes usingmiddleware
 */
accountRouter.post("/delete", isAuthenticated, deleteAccount);
accountRouter.post("/update", isAuthenticated, updateAccount);

export default accountRouter;
