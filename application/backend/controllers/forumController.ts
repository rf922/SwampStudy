import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Question } from "../entities/questions.entity";
import { Answer } from "../entities/answer.entity";
import { validate } from "class-validator";

// Get questions
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await myDataSource.getRepository(Question).find();
    return res.json(questions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving questions", details: error });
  }
};

// Create question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = myDataSource.getRepository(Question).create(req.body);
    const errors = await validate(question);
    if (errors.length > 0) return res.status(400).json(errors);

    const savedQuestion = await myDataSource
      .getRepository(Question)
      .save(question);
    return res.status(201).json(savedQuestion);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating question", details: error });
  }
};

// Get  answers to question
export const getAnswersToQuestion = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.questionId);
  if (isNaN(questionId)) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  try {
    const answers = await myDataSource.getRepository(Answer).find({
      where: { question: questionId },
      relations: ["account"],
    });
    return res.json(answers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving answers", details: error });
  }
};

// Create new answer to question
export const createAnswer = async (req: Request, res: Response) => {
  try {
    const answer = myDataSource.getRepository(Answer).create(req.body);
    const errors = await validate(answer);
    if (errors.length > 0) return res.status(400).json(errors);

    const savedAnswer = await myDataSource.getRepository(Answer).save(answer);
    return res.status(201).json(savedAnswer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating answer", details: error });
  }
};
