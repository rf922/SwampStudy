import {getAccount, postAccount} from "../controllers/account_controller";

const express = require("express");
const router = express.Router();

router.get("/:id", getAccount);
router.post("/", postAccount)

module.exports = router;