import { Router } from "express";
import {
  getAllQuestions,
  createQuestion,
  getAnswersToQuestion,
  createAnswer,
} from "../controllers/forumController.js";
//es6 syntax for import exports

const forumRouter = Router();

// Routes for questions
forumRouter.get("/questions", getAllQuestions);
forumRouter.post("/questions", createQuestion);

// Routes for answers
forumRouter.get("/questions/:questionId/answers", getAnswersToQuestion);
forumRouter.post("/questions/:questionId/answers", createAnswer);

export default forumRouter;
