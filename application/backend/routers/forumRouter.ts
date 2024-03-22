import { Router } from "express";
import {
  getAllQuestions,
  createPost,
  getAnswersToQuestion,
  createAnswer,
  getClasses,
  getQuestion,
  getQuestionsWithThreadAndClass,
  getClassesByDepartment,
} from "../controllers/forumController";
//es6 syntax for import exports

const forumRouter = Router();

// Routes for questions
forumRouter.get("/questions", getAllQuestions);
forumRouter.get("/questions/:questionId", getQuestion);
forumRouter.post("/question", createPost);

// Routes for answers
forumRouter.get("/questions/:questionId/answers", getAnswersToQuestion);
forumRouter.post("/questions/:questionId/answers", createAnswer);

// Route for getting all classes
forumRouter.get("/classes", getClasses);

forumRouter.get("/departments/listing", getClassesByDepartment);

//getQuestionsWithThreadAndClass
forumRouter.get("/departments/dev", getQuestionsWithThreadAndClass);

export default forumRouter;
