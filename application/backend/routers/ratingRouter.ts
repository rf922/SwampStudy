import { resolveRatingController } from "./../middleware/resolveControllers";
//import { isAuthenticated } from "./../middleware/isAuthenticated";
import express from "express";

const ratingRouter = express.Router();

ratingRouter.use(resolveRatingController);

ratingRouter.post("/ping/:msg", (req, _res) =>
  req.ratingController.pingController(req, _res),
);
ratingRouter.post("/", (req, _res) =>
  req.ratingController.postRating(req, _res),
);
ratingRouter.get("/", (req, _res) => req.ratingController.getRating(req, _res));

export default ratingRouter;
