import { DIContainer } from "./../config/DIContainer";
/* collection of middleware for dynamically resolving controllers using the DIContainer and attaching them to req*/
/* when new controllers are introduced they should have a function here which resolves them in their router */
/* NOTE : when adding a resolve controller ensure that request in ./types/request/index.d.ts is extended to accomodate attaching the controller*/
/* each follows a similar pattern , resolve the controller, attach it, finish by calling next to pass to the next middleware / route handlr */

/**
 * uses DIContainer to resolve the account controller
 * @param req //request controller will be attached to
 * @param res
 * @param next // call to next to pass on to the next midlware or route hndlr
 */
export const resolveAccountController = (req, res, next) => {
  const accountController = DIContainer.resolve("AccountController"); // class the corresponding resolve method
  req.accountController = accountController; // attaches it to req
  next(); //calls to next
};

/**
 * uses DIContainer to resolve the user controller
 * @param req //request controller will be attached to
 * @param res
 * @param next // call to next to pass on to the next midlware or route hndlr
 */
export const resolveUserController = (req, res, next) => {
  const userController = DIContainer.resolve("UserController");
  req.userController = userController;
  next();
};

/**
 * uses DIContainer to resolve the authentication controller
 * @param req //request controller will be attached to
 * @param res
 * @param next // call to next to pass on to the next midlware or route hndlr
 */
export const resolveAuthenticationController = (req, res, next) => {
  const authenticationController = DIContainer.resolve(
    "AuthenticationController",
  );
  req.authenticationController = authenticationController;
  next();
};

/**
 * uses DIContainer to resolve the forum controller
 * @param req //request controller will be attached to
 * @param res
 * @param next // call to next to pass on to the next midlware or route hndlr
 */
export const resolveForumController = (req, res, next) => {
  const forumController = DIContainer.resolve("ForumController");
  req.forumController = forumController;
  next();
};

/**
 * uses DIContainer to resolve the like controller
 * @param req //request controller will be attached to
 * @param res
 * @param next // call to next to pass on to the next midlware or route hndlr
 */
export const resolveLikeController = (req, res, next) => {
  const likeController = DIContainer.resolve("LikeController");
  req.likeController = likeController;
  next();
};

/**
 * uses DIContainer to resolve the match controller
 * @param req //request controller will be attached to
 * @param res
 * @param next // call to next to pass on to the next midlware or route hndlr
 */
export const resolveMatchController = (req, res, next) => {
  const matchController = DIContainer.resolve("MatchController");
  req.matchController = matchController;
  next();
};
