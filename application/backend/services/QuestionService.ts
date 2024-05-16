import { validateFields } from "./../utils/validationUtils";
import { QuestionRepository } from "./../repositories/QuestionRepository";

/**
 * Questions service handles question related logic
 *
 */
export class QuestionService {
  /**
   * QuestionService depends on te questionRepository for
   * interacting with the db.
   * @param questionRepository
   */
  constructor(private questionRepository: typeof QuestionRepository) {
    this.questionRepository = questionRepository;
  }

  /**
   * creates a question on behalf of the user with userId
   * @param userId
   * @param classId
   * @param questionText
   * @param threadTitle
   * @returns
   */
  public async createQuestion(
    userId: number,
    classId: number,
    questionText: string,
    threadTitle: string,
  ) {
    if (!validateFields({ threadTitle, questionText })) {
      throw new Error("400");
    }

    return await this.questionRepository.createQuestion(
      userId,
      classId,
      questionText,
      threadTitle,
    );
  }

  /**
   * retrieves a single question by questionId
   * @param questionId
   * @returns question corresponding to questionId
   */
  public async getQuestion(questionId: number) {
    const question = await this.questionRepository.getQuestion(questionId);
    return question;
  }

  /**
   * gets all questions in the db
   * @returns
   */
  public async getAllQuestions() {
    const questions = await this.questionRepository.getAllQuestions();
    return questions;
  }
}
