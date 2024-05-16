import { validateFields } from "./../utils/validationUtils";
import { Thread } from "./../entities/thread.entity";
import { ThreadRepository } from "./../repositories/ThreadRepository";

/**
 * ThreadService handles thread related logic, performing business logic and using
 * a thread repo instance to handle db operationss
 */
export class ThreadService {
  /**
   * ThreadService depends on thread repo to handle thread related
   * db operations
   * @param threadRepository
   */
  constructor(private threadRepository: typeof ThreadRepository) {
    this.threadRepository = threadRepository;
  }

  /**
   * gets answers corresponding to a questionId
   * @param questionId
   * @returns an array of reformatted answers
   */
  public async getThreadAnswers(questionId: number) {
    const thread = await this.threadRepository.getThreadAnswers(questionId);
    if (!thread) {
      // ensure thread was found
      throw new Error("Thread not found");
    }
    return this.formatAnswers(thread);
  }

  /**
   * helper function to format answers to threads into a more client friendly
   * structure
   * @param thread
   * @returns
   */
  private formatAnswers(thread: Thread) {
    // ensure that thread.answers is properly loaded
    const formattedAnswers = thread.answers.map((answer) => ({
      id: answer.id,
      answer: answer.answer,
      account: {
        id: answer.account.id,
        first_name: answer.account.first_name,
        last_name: answer.account.last_name,
        profile_picture: answer.account.profile_picture,
      },
    }));
    return formattedAnswers;
  }

  /**
   * handles the creation of an answer to a question correspnding to questionId
   * @param userId
   * @param questionId
   * @param answerText
   * @returns
   */
  public async createAnswer(
    userId: number,
    questionId: number,
    answerText: string,
  ) {
    if (!validateFields({ answerText })) {
      throw new Error("400");
    }
    return await this.threadRepository.createThreadAnswer(
      userId,
      questionId,
      answerText,
    );
  }

  /**
   * retrieves all threads
   * @returns an array of thread objects
   */
  public async getAllThreads() {
    return await this.threadRepository.getAllThreads();
  }

  /**
   * retrieves all threads grouped first by class then by class department
   * @returns a map with k = department v = a nestd map with k_ = class , v_ = thread
   */
  public async getThreadsByDepartmentAndClass() {
    const threads = await this.getAllThreads();
    return this.groupThreadsByDepartmentAndClass(threads);
  }

  /**
   * retrieves 10 threads starting from the given page number
   * @param page
   * @returns
   */
  public async getThreadPage(page: number) {
    try {
      return await this.threadRepository.getThreadPage(page);
    } catch (error) {
      console.error("Failed to get thread page:", error);
    }
  }

  /**
   * retrieves 10 threads starting from the given page number
   * @param page
   * @returns
   */
  public async getThreadPageByClass(cls: string, page: number) {
    try {
      return await this.threadRepository.getThreadPageByClass(page, cls);
    } catch (error) {
      console.error("Failed to get thread page:", error);
    }
  }

  /**
   * organizes classes which have at least one thread to them
   * into a grouping of class objects and their thread counts to their dep
   * @returns
   */
  public async getThreadClasses() {
    try {
      const classDetails = await this.threadRepository.getClassThreadCounts();
      return this.transformClassesToMap(classDetails);
    } catch (error) {
      console.error("Failed to get thread classes:", error);
      return {}; // failure
    }
  }

  /**
   * helper which takes a map of classes and their counts of threads and
   * process them into a grouping of classes by department
   * @param classDetails
   * @returns
   */
  private transformClassesToMap(classDetails) {
    const departmentMap = {};

    classDetails.forEach(({ id, name, number, department, _threadCount }) => {
      if (!departmentMap[department]) {
        //if the dep is not initiated, then initialize it
        departmentMap[department] = [];
      }

      departmentMap[department].push({
        //push the class to the corresponding dep in the map
        id,
        name,
        number,
        department,
      });
    });

    return departmentMap;
  }
  /**
   * method to search for a thread whose title contains the passed word
   * @param phrase
   * @returns
   */
  public async threadSearch(phrase: string, classId: number) {
    /**
     * pos sanitize , clean word/ phrase
     */
    return await this.threadRepository.threadTitleContains(phrase, classId);
  }

  /**
   * helper method which groups threads into a map like structure
   * the map holds k = department, v = a nestd map with k_ = class , v_ = thread
   * @param threads
   * @returns a map holds k = department, v = a nestd map with k_ = class , v_ = thread
   */
  private groupThreadsByDepartmentAndClass(threads: Thread[]) {
    return threads.reduce((acc, thread) => {
      // call reduce on thread array
      // set dep and class name param sub if not present
      const departmentName = thread.class?.department || "No Department";
      const className = thread.class?.name || "No Class";

      if (!acc[departmentName]) {
        //check for the presence of a dep in the map if absent
        acc[departmentName] = {}; //initialize it
      }
      if (!acc[departmentName][className]) {
        //check for the presence of a class within the dep map, if absent
        acc[departmentName][className] = []; //init it
      }
      acc[departmentName][className].push(thread); //push the thread into the nested map

      return acc; //return the map
    }, {}); //empty init acc val
  }
}
