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
 *  sensitive routes here will use isAuthenticated middle ware to protect them from unauthorized access
 */

const accountRouter = express.Router();
accountRouter.get("/details", details);
accountRouter.get("/", getAccount);
accountRouter.post("/", postAccount);

/**
 * protect sensitive routes usingmiddleware
 */
accountRouter.post("/delete", deleteAccount);
accountRouter.post("/update", updateAccount);

export default accountRouter;
