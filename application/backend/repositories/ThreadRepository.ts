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
      take: 3,
    });
  },

  /**
   * get the classes that have atleast one thread in them
   * @returns array of class obj with their threadCount.
   */
  async getClassThreadCounts() {
    return this.createQueryBuilder("thread")
      .innerJoin("thread.class", "class")
      .select("class.id", "id")
      .addSelect("class.name", "name")
      .addSelect("class.number", "number")
      .addSelect("class.department", "department")
      .addSelect("COUNT(thread.id)", "threadCount")
      .groupBy("class.id")
      .addGroupBy("class.name")
      .addGroupBy("class.number")
      .addGroupBy("class.department")
      .orderBy("threadCount", "DESC")
      .getRawMany();
  },

  /**
   * gets a specified number of threads from db starting from page number
   * going forward
   * @returns
   */
  async getThreadPage(page: number) {
    const take = 10; // number of threads per page
    const offSet = (page - 1) * take; // offset

    return this.createQueryBuilder("thread")
      .leftJoinAndSelect("thread.class", "class")
      .leftJoinAndSelect("thread.question", "question")
      .leftJoinAndSelect("question.account", "account") //may add answers later
      .skip(offSet) //  offset
      .take(take) //  LIMIT
      .getMany();
  },

  /**
   * gets a specified number of threads from db starting from page number
   * going forward
   * @returns
   */
  async getThreadPageByClass(page: number, cls: string) {
    const take = 10; // number of threads per page
    const offSet = (page - 1) * take; // offset

    return (
      this.createQueryBuilder("thread")
        .leftJoinAndSelect("thread.class", "class")
        // Filter based on the cls name
        .where("class.name = :name", { name: cls })
        .leftJoinAndSelect("thread.question", "question")
        .leftJoinAndSelect("question.account", "account") // may add answers later
        .skip(offSet) // offset
        .take(take) // LIMIT
        .getMany()
    );
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

  /**
   * search threads by title,
   * @param phrase
   * @returns the thread or threads containing the passed word
   */
  async threadTitleContains(phrase: string, classId: number) {
    return this.createQueryBuilder("thread")
      .where("thread.title LIKE :phrase", { phrase: `%${phrase}%` }) //using LIKE and wild card to check contains
      .leftJoinAndSelect("thread.class", "class") //bring the class
      .leftJoinAndSelect("thread.question", "question") //teh question
      .leftJoinAndSelect("question.account", "account") //the acc
      .where("class.id = :classId", { classId }) // filtering on results corr to classId
      .andWhere("thread.title LIKE :phrase OR question.question LIKE :phrase", {
        phrase: `%${phrase}%`,
      }) // my sql LIKE plus wild card to check title and question body

      .getMany();
  },
});
