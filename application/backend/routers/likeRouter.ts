import { postLike } from "../controllers/likeController";

const express = require("express");
const router = express.Router();

router.post("/", postLike);

module.exports = router;
