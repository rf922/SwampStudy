import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuestionService } from "./../services/QuestionService";
import { ThreadService } from "./../services/ThreadService";
import { ClassService } from "./../services/ClassService";

/**
 * forumController handles forum related http request
 */
export class ForumController {
  /**
   * forum controller depends on Question service, ThreadService, and ClassService for
   * handling logic related to question, threand or class operations
   * @param questionService
   * @param threadService
   * @param classService
   */
  constructor(
    private questionService: QuestionService,
    private threadService: ThreadService,
    private classService: ClassService,
  ) {
    this.questionService = questionService;
    this.threadService = threadService;
    this.classService = classService;
  }

  /**
   * creates a question by validating the request data,
   * invoking the business logic to create the question ,
   * and returning an appropriate HTTP response.
   * @param req
   * @param res
   * @returns
   */
  public async createQuestion(req: Request, res: Response) {
    const userId = req.session.userId;
    const { classId, questionText, threadTitle } = req.body;
    if (!threadTitle || !questionText) {
      //ensure validity of params
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Missing required parameters: thread title and/or question text.",
      });
    }
    try {
      const { thread, question } = await this.questionService.createQuestion(
        userId,
        classId,
        questionText,
        threadTitle,
      );
      res.status(StatusCodes.CREATED).json({ thread, question });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating question", details: error });
    }
  }

  /**
   * retrieves a question by questionId
   * @param req
   * @param res
   * @returns
   */
  public async getQuestion(req: Request, res: Response) {
    try {
      const questionId = parseInt(req.params.questionId);
      if (isNaN(questionId)) {
        //ensure valid questionID
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid question ID" });
      }
      const question = await this.questionService.getQuestion(questionId);
      res.status(StatusCodes.ACCEPTED).json(question);
    } catch (error) {
      if (error.name === "EntityNotFound") {
        // question doesn't exist
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Question not found" });
      } else {
        console.error("Error retrieving question:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Error retrieving question",
          details: error.toString(),
        });
      }
    }
  }

  /**
   * retrieves all questions with their associated account
   * @param req
   * @param res
   * @returns
   */
  public async getAllQuestions(req: Request, res: Response) {
    try {
      const questions = await this.questionService.getAllQuestions();
      return res.json(questions);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR) // may add responses for specific serv errors
        .json({ message: "Error retrieving questions", details: error });
    }
  }

  /**
   * creates a new answer to a question by questionId
   * @param req
   * @param res
   */
  public async createAnswer(req: Request, res: Response) {
    //use userId from sess to assoc. thread with account
    const userId = req.session.userId;
    const questionId = parseInt(req.params.questionId); // question they are postinh answer to
    const { answer } = req.body; //answers content
    if (!answer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Answer content is required" });
    }
    try {
      const newAnswer = await this.threadService.createAnswer(
        userId,
        questionId,
        answer,
      );
      res.status(StatusCodes.CREATED).json(newAnswer);
    } catch (error) {
      console.error("Transaction failed", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error creating answer",
        details: error.toString(),
      });
    }
  }

  /**
   * gets all answers to a given question corresponding to questionId
   * @param req
   * @param res
   * @returns an array of formatted answers
   */
  public async getAnswersToQuestion(req: Request, res: Response) {
    const questionId = parseInt(req.params.questionId);
    if (isNaN(questionId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid question ID" });
    }
    try {
      const thread = await this.threadService.getThreadAnswers(questionId);
      return res.json(thread);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error retrieving answers", details: error });
    }
  }

  /**
   * get all available classses
   * @param req
   * @param res
   * @returns an array of classes
   */
  public async getClasses(req: Request, res: Response) {
    try {
      const classes = await this.classService.getAllClasses();
      return res.json(classes);
    } catch (error) {
      console.error("error retrieving classes", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error retrieving classes", details: error });
    }
  }

  /**
   * get all classes grouped by depaartment
   * @param req
   * @param res
   */
  public async getClassesByDepartment(req: Request, res: Response) {
    try {
      const classesByDep = await this.classService.getAllClassesByDepartment();
      res.json(classesByDep);
    } catch (error) {
      console.error("Error retrieving departments:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error retrieving departments",
        details: error.message,
      });
    }
  }

  /**
   * get all threads grouped by class then by department
   * @param req
   * @param res
   * @returns a map with k = department v = a nested map with k_ = class v_ = threads
   */
  public async getThreadsByDepartment(req: Request, res: Response) {
    try {
      const threads = await this.threadService.getThreadsByDepartmentAndClass();
      res.json(threads);
    } catch (error) {
      console.error(
        "Error retrieving questions with their threads and classes:",
        error,
      );
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error retrieving questions with their threads and classes",
        details: error.message,
      });
    }
  }
}
