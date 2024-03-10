import { getAccount, postAccount } from "../controllers/accountController";

const express = require("express");
const router = express.Router();

router.get("/:id", getAccount);
router.post("/", postAccount);

module.exports = router;
