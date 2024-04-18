import { Router } from "express";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import { resolveForumController } from "./../middleware/resolveControllers";
//es6 syntax for import exports

const forumRouter = Router();
//resolve and attach the controller
forumRouter.use(resolveForumController);

// Routes for questions
forumRouter.get("/questions", (req, _res) =>
  req.forumController.getAllQuestions(req, _res),
);
forumRouter.get("/questions/:questionId", (req, _res) =>
  req.forumController.getQuestion(req, _res),
);
forumRouter.post("/question", isAuthenticated, (req, _res) =>
  req.forumController.createQuestion(req, _res),
);

// Routes for answers
forumRouter.get("/questions/:questionId/answers", (req, _res) =>
  req.forumController.getAnswersToQuestion(req, _res),
);
forumRouter.post(
  "/questions/:questionId/answers",
  isAuthenticated,
  (req, _res) => req.forumController.createAnswer(req, _res),
);

// Route for getting all classes
forumRouter.get("/classes", (req, _res) => req.forumController.getClasses);
forumRouter.get("/departments/listing", (req, _res) =>
  req.forumController.getClassesByDepartment(req, _res),
);

forumRouter.get("/departments/threads", (req, _res) =>
  req.forumController.getThreadsByDepartment(req, _res),
);

forumRouter.get("/threads/page/:page", (req, _res) =>
  req.forumController.getThreadPage(req, _res),
);

forumRouter.get("/threads/:class/page/:page", (req, _res) =>
  req.forumController.getThreadPageByClass(req, _res),
);

forumRouter.get("/threads/class/listing", (req, _res) =>
  req.forumController.getThreadClasses(req, _res),
);

forumRouter.get("/threads/search/", (req, _res) =>
  req.forumController.threadSearch(req, _res),
);

export default forumRouter;
