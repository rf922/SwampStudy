import { myDataSource } from "./../../backend/app-data-source";
import { Thread } from "../entities/thread.entity";
import { Question } from "../entities/question.entity";
import { Answer } from "../entities/answer.entity";
import { Account } from "../entities/account.entity";

/**
 * Thread repository whose sole purpose is handling thread
 * related db operations. data llayer for threads
 */
export const ThreadRepository = myDataSource.getRepository(Thread).extend({
  /**
   * creates an answer and associated it to the corresponding
   * user and question
   * @param userId
   * @param questionId
   * @param answerText
   * @returns the saved answer
   */
  async createThreadAnswer(
    userId: number,
    questionId: number,
    answerText: string,
  ) {
    return myDataSource.transaction(async (transactionEntityManager) => {
      //use transaction entity manager to ensure all codes executes and data is not fragmented
      const account = await transactionEntityManager //account posting the answer
        .getRepository(Account)
        .findOneBy({ user_FK: { id: userId } });
      const question = await transactionEntityManager //question to which the answer is being made
        .getRepository(Question)
        .findOne({
          //get the question by id and bring its thread object
          where: { id: questionId },
          relations: ["thread"],
        });

      if (!account || !question) {
        throw new Error("Account or Question not found");
      }

      // create the answer and assoc its acc and question thread
      const newAnswer = transactionEntityManager.getRepository(Answer).create({
        answer: answerText,
        account: account,
        thread: question.thread,
      });

      return transactionEntityManager.getRepository(Answer).save(newAnswer);
    });
  },

  /**
   * gets all threads together with their corresponding class, question and the questions assoc account
   * @returns
   */
  async getAllThreads() {
    return this.find({
      //may expand to also bring along the assoc answers
      relations: ["class", "question", "question.account"],
    });
  },

  /**
   * get all answers correspinding to a specific thread i,e question by questionId
   * @param questionId
   * @returns the answer and its assoc account
   */
  async getThreadAnswers(questionId: number) {
    return this.findOne({
      //find the thread and bring its answers and their acc
      where: { question: { id: questionId } },
      relations: ["answers", "answers.account"],
    });
  },
});
