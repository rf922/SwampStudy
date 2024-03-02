const{ login, register } = require("../controllers/userControllers");
express = require("express");

userRouter = express.Router();

userRouter.post("/login", login);

userRouter.post("/register", register);


module.exports = userRouter;
