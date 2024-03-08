import { postUser } from "../controllers/user_controller";

const express = require("express");
const router = express.Router();

router.post("/", postUser);

module.exports = router;
