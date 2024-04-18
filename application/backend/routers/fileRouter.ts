import express from "express";
import generateUrl from "../services/FileService";

const fileRouter = express.Router();

fileRouter.get("/", async (req, res) => {
  const { filename, path } = req.query;
  const urls = await generateUrl(filename, path);

  res.send({ urls });
});

export default fileRouter;
