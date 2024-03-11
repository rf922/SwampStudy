import { getMatch } from "../controllers/matchController";

const express = require("express");
const router = express.Router();

router.get("/", getMatch);

module.exports = router;
