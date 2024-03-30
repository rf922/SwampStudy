import { myDataSource } from "./../../backend/app-data-source";
import { Question } from "../entities/question.entity";
import { validate } from "class-validator";
import { User } from "./../entities/user.entity";
import { Class } from "./../entities/class.entity";
import { Thread } from "./../entities/thread.entity";

/**
 * handles the data layer for question related db operations
 */
export const QuestionRepository = myDataSource.getRepository(Question).extend({
  /**
   * Handles the creation of a new question associating it with a new
   * thread, and an existing accout
   * @param userId
   * @param classId
   * @param questionText
   * @param threadTitle
   * @returns
   */
  async createQuestion(
    userId: number,
    classId: number,
    questionText: string,
    threadTitle: string,
  ) {
    return myDataSource.transaction(async (transactionEntityManager) => {
      //use traansaction to ensure succ execution/ keep db integrity
      // get the user, class,  thread repos
      const userRepo = transactionEntityManager.getRepository(User);
      const classRepo = transactionEntityManager.getRepository(Class);
      const threadRepo = transactionEntityManager.getRepository(Thread);

      const userWithAccount = await userRepo.findOne({
        //find the user and account creating the question
        where: { id: userId },
        relations: ["account"],
      });

      if (!userWithAccount || !userWithAccount.account) {
        //ensure that a user and corresponding account are found
        throw new Error("User account not found");
      }

      const question = this.create({
        //create the question and assoc its account
        question: questionText,
        account: userWithAccount.account,
      });

      const errors = await validate(question);
      if (errors.length > 0) {
        console.error("Validation errors for question", errors);
        throw new Error("Validation failed for the question");
      }

      await this.save(question);
      const threadClass = await classRepo.findOne({ where: { id: classId } });

      if (!threadClass) {
        throw new Error("Class not found");
      }
      const thread = threadRepo.create({
        //create the thread, with tittle,  and assoc its question and class
        title: threadTitle,
        class: threadClass,
        question: question,
      });

      const savedThread = await threadRepo.save(thread);

      return { thread: savedThread, question: question };
    });
  },

  /**
   * gets a single question by id
   * @param questionId
   * @returns question matching the given id
   */
  async getQuestion(questionId: number) {
    return this.findOneOrFail({
      where: { id: questionId },
      relations: ["account"],
    });
  },

  /**
   * gets all questions together with their associated
   * account
   * @returns all questions with assoc accounts
   */
  async getAllQuestions() {
    return this.find({
      relations: {
        account: true,
      },
      select: {
        id: true,
        question: true,
        account: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    });
  },
});
