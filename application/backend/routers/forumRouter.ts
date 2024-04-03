import { Router } from "express";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import {
  getAllQuestions,
  createPost,
  getAnswersToQuestion,
  createAnswer,
  getClasses,
  getQuestion,
  getThreadsByDepartment,
  getClassesByDepartment,
} from "../controllers/forumController";
//es6 syntax for import exports

const forumRouter = Router();

// Routes for questions
forumRouter.get("/questions", getAllQuestions);
forumRouter.get("/questions/:questionId", isAuthenticated,getQuestion);
forumRouter.post("/question", isAuthenticated, createPost);

// Routes for answers
forumRouter.get("/questions/:questionId/answers", getAnswersToQuestion);
forumRouter.post(
  "/questions/:questionId/answers",
  isAuthenticated,
  createAnswer,
);

// Route for getting all classes
forumRouter.get("/classes", isAuthenticated,getClasses);

forumRouter.get("/departments/listing", isAuthenticated,getClassesByDepartment);

forumRouter.get("/departments/threads", isAuthenticated,getThreadsByDepartment);

export default forumRouter;
