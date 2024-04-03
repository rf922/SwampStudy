import { isAuthenticated } from "./../middleware/isAuthenticated";
import { resolveAccountController } from "../middleware/resolveControllers";
import express from "express";

/**
 * to - do sensitive routes here will use isAuthenticated middle ware
 */

const accountRouter = express.Router();
// use middleware to resolve acc controller
accountRouter.use(resolveAccountController);

accountRouter.get(
  "/details",
  (req, res) => req.accountController.getAccountDetails(req, res), //controller is attached to req
);
accountRouter.get("/:id",isAuthenticated, (req, res) =>
  req.accountController.getAccount(req, res),
);
//accountRouter.post("/", accountController.postAccount);

/**
 * protect sensitive routes using auth middleware
 */
accountRouter.post("/delete", isAuthenticated, (req, res) =>
  req.accountController.deleteAccount(req, res),
);

accountRouter.post("/update", isAuthenticated, (req, res) =>
  req.accountController.updateAccount(req, res),
);
export default accountRouter;
