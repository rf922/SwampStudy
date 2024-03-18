import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Question } from "../entities/questions.entity";
import { Answer } from "../entities/answer.entity";
import { Account } from "../entities/account.entity";
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

// Create question Testing in progress

export const createQuestion = async (req: Request, res: Response) => {
  try {
    // Extract the accountId and question from the request
    const { accountId, question } = req.body;
    // Parse the accountId to an integer this is a personal test to see if id was the issue
    const Accountid = parseInt(accountId);
    if(isNaN(Accountid)){return res.status(400).json({ message: "error in parse" });}
    const questionText = question;

    // Check if the accountId exists in the database
    const account = await myDataSource.getRepository(Account).findOneBy({ id: Accountid });
    if (!account) {
      return res.status(404).json({ message: "Account not found for the user" });
    }

    // Create a new question and associate it with the account
    const newQuestion = new Question();
    newQuestion.question = questionText;
    // Validate the new question
    const errors = await validate(newQuestion);
    if (errors.length > 0) {
      return res.status(400).json({message: "error in new question",details: errors});
    }

    // Save the new question to the database
    const savedQuestion = await myDataSource.getRepository(Question).save(questionText);
    return res.status(201).json(savedQuestion);
  } catch (error) {
    return res.status(500).json({ message: "Error creating question", details: error.toString() });
  }
};

// Get  answers to question in progress and untested
export const getAnswersToQuestion = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.questionId);
  if (isNaN(questionId)) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  try {
    const answers = await myDataSource.getRepository(Answer).find({
      where: {
        question: { id: questionId },
      },
      relations: {
        account: true,
      },
    });
    return res.json(answers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving answers", details: error });
  }
};

// Create new answer to question in progress and untested
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
