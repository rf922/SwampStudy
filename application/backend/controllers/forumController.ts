import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Question } from "../entities/questions.entity";
import { Thread } from "../entities/thread.entity";
import { Account } from "../entities/account.entity";
import { User } from "../entities/users.entity";
import { Class } from "../entities/class.entity";
import { Answer } from "../entities/answer.entity";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

// create question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    // Extract the accountId and question from the request
    const { accountId, question } = req.body;
    // Parse the accountId to an integer this is a personal test to see if id was the issue
    const Accountid = parseInt(accountId);
    if (isNaN(Accountid)) {
      return res.status(400).json({ message: "error in parse" });
    }
    const questionText = question;

    // Check if the accountId exists in the database
    const account = await myDataSource
      .getRepository(Account)
      .findOneBy({ id: Accountid });
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account not found for the user" });
    }

    // Create a new question and associate it with the account
    const newQuestion = new Question();
    newQuestion.question = questionText;
    // Validate the new question
    const errors = await validate(newQuestion);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ message: "error in new question", details: errors });
    }

    // Save the new question to the database
    const savedQuestion = await myDataSource
      .getRepository(Question)
      .save(newQuestion);
    return res.status(201).json(savedQuestion);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating question", details: error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  //use userId from sess to assoc. thread with account
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
    // create thread, question
    await myDataSource.transaction(async (transactionalEntityManager) => {
      // grab the user and assoc. acc
      const userWithAccount = await transactionalEntityManager
        .getRepository(User)
        .findOne({
          where: { id: userId },
          relations: ["account"],
        });

      if (!userWithAccount || !userWithAccount.account) {
        // ensure the user and account are valid
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "User account not found" });
      }

      // reuse `transactionalEntityManager` to keep transaction context
      const question = transactionalEntityManager
        .getRepository(Question)
        .create({
          // create question and ensure relation with acc.
          question: questionText,
          account: userWithAccount.account,
        });

      // val the question
      const errors = await validate(question);
      if (errors.length > 0) {
        console.error("FOUND ERRORS TRYING TO VALIDATE QUESTION", errors);
        return res.status(StatusCodes.BAD_REQUEST).json(errors);
      }

      // save question using the t-e-m
      const savedQuestion = await transactionalEntityManager
        .getRepository(Question)
        .save(question);

      // create corresponding thread
      const thread = transactionalEntityManager.getRepository(Thread).create({
        title: threadTitle,
        class: classId,
        question: savedQuestion,
      });

      const savedThread = await transactionalEntityManager
        .getRepository(Thread)
        .save(thread);

      // if all operations succeed, commit the transaction and respond
      res
        .status(StatusCodes.CREATED)
        .json({ thread: savedThread, question: savedQuestion });
    });
  } catch (error) {
    console.error("Error during transaction:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating post", details: error.toString() });
  }
};

// get question by id
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.questionId);
    if (isNaN(questionId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid question ID" });
    }
    const question = await myDataSource.getRepository(Question).findOneOrFail({
      //get a question and the associated account
      where: { id: questionId },
      relations: { account: true },
    });

    return res.status(StatusCodes.ACCEPTED).json(question);
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
};

export const getAnswersToQuestion = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.questionId);
  if (isNaN(questionId)) {
    return res.status(400).json({ message: "Invalid question ID" });
  }

  try {
    const answers = await myDataSource.getRepository(Answer).find({
      where: { id: questionId },
      relations: ["account"],
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

// get all questions , refacor to instead get all threads and assoc question?
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    //const questions = await myDataSource.getRepository(Question).find();
    const questions = await myDataSource.getRepository(Question).find({
      relations: {
        // join related account
        account: true,
      },
      select: {
        // should add a created field to quest ent, introduce sort by created date, etc/ select fields
        id: true,
        question: true,
        account: {
          //select fields from account
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    });
    return res.json(questions);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR) // may add responses for specific serv errors
      .json({ message: "Error retrieving questions", details: error });
  }
};

// get all available classes, optinally get all classses corresponding to dep param if passed
export const getClasses = async (req: Request, res: Response) => {
  const dep = req.query.department;
  try {
    let classes: Class[];
    if (dep) {
      //prvided dep was passed, yield courses corresponding to dep
      classes = await myDataSource
        .getRepository(Class)
        .createQueryBuilder("class")
        .where("class.department = :department", { department: dep })
        .getMany();
    } else {
      // dep not passed, default retrieve all classes
      classes = await myDataSource.getRepository(Class).find();
    }

    return res.json(classes);
  } catch (error) {
    console.error("error retrieving classes", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving classes", details: error });
  }
};

// get a listing of the current class departments
export const getClassesByDepartment = async (req: Request, res: Response) => {
  try {
    //grab thread and corr. class
    const threads = await myDataSource
      .getRepository(Thread)
      .createQueryBuilder("thread")
      .leftJoinAndSelect("thread.class", "class")
      .getMany();

    // Group classes by their department attribute
    const groupedByDepartment = threads.reduce((acc, thr) => {
      const departmentName = thr.class.department;
      if (!acc[departmentName]) {
        acc[departmentName] = [];
      }
      acc[departmentName].push(thr);
      return acc;
    }, {});

    res.json(groupedByDepartment);
  } catch (error) {
    console.error("Error retrieving departments:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving departments",
      details: error.message,
    });
  }
};

// return
export const getQuestionsWithThreadAndClass = async (
  req: Request,
  res: Response,
) => {
  try {
    // querry for threads, the corresponding class, question and corresponfing account
    const threads = await myDataSource
      .getRepository(Thread)
      .createQueryBuilder("thread")
      .leftJoinAndSelect("thread.class", "class")
      .leftJoinAndSelect("thread.question", "question")
      .leftJoinAndSelect("question.account", "account")
      .getMany();

    const grouped = threads.reduce((acc, thread) => {
      //gather threads by class, and by department
      const departmentName =
        thread.class && thread.class.department
          ? thread.class.department
          : "No Department";
      const className = thread.class ? thread.class.name : "No Class";

      if (!acc[departmentName]) {
        acc[departmentName] = {};
      }

      if (!acc[departmentName][className]) {
        acc[departmentName][className] = [];
      }

      acc[departmentName][className].push(thread);

      return acc;
    }, {});

    // Send the structured data as a response
    res.json(grouped);
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
};
