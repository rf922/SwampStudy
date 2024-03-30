import { AuthenticationController } from "../../controllers/authenticationController";
import { AccountController } from "../../controllers/accountController";
import { UserController } from "../../controllers/userController";
import { ForumController } from "../../controllers/ForumController";

/* this file is for extending Request so we caan attach our controllers, as controllers are added they should be added here */

declare module "express-serve-static-core" {
  interface Request {
    // controllers go beloww here
    accountController?: AccountController;
    userController?: UserController;
    forumController?: ForumController;
    //    likeController?: LikeController;
    //    matchController?: MatchController;
    authenticationController?: AuthenticationController;
  }
}
