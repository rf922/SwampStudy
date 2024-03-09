import { postUser } from "../controllers/userController";

const express = require("express");
const router = express.Router();

router.post("/", postUser);

module.exports = router;
