const{ login } = require("../controllers/userControllers");
express = require("express");

userRouter = express.Router();

userRouter.post("/login", login);

module.exports = userRouter;
