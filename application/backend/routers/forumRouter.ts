import { Router } from "express";
import {
  getAllQuestions,
  createQuestion,
  getAnswersToQuestion,
  createAnswer,
} from "../controllers/forumController";

const router = Router();

// Routes for questions
router.get("/questions", getAllQuestions);
router.post("/questions", createQuestion);

// Routes for answers
router.get("/questions/:questionId/answers", getAnswersToQuestion);
router.post("/questions/:questionId/answers", createAnswer);

export default router;
