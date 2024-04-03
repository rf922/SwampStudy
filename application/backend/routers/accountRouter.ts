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
accountRouter.get("/details",isAuthenticated ,details);
accountRouter.get("/",isAuthenticated ,getAccount);
accountRouter.post("/",isAuthenticated,postAccount);

/**
 * protect sensitive routes usingmiddleware
 */
accountRouter.post("/delete", isAuthenticated, deleteAccount);
accountRouter.post("/update", isAuthenticated, updateAccount);

export default accountRouter;
