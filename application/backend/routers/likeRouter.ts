import { resolveLikeController } from "./../middleware/resolveControllers";
import express from "express";

const likeRouter = express.Router();
/* resolve the like controller  */
likeRouter.use(resolveLikeController);

/* note the arrow syntax */
likeRouter.post("/", (req, _res) => req.likeController.postLike(req, _res));

export default likeRouter;
