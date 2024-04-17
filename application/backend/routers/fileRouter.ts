import { resolveFileController } from "../middleware/resolveControllers";
import express from "express";

const fileRouter = express.Router();

fileRouter.use(resolveFileController);

fileRouter.get("/", async (req, res) =>
  req.fileController.getSignedAndPublicUrl(req, res),
);

export default fileRouter;
