import { ClassScheduleRepository } from "../repositories/ClassScheduleRepository";

/**
 * class scheduel service to handle user scheduel related business logic and uses
 * a repo to handle db ops
 */
export class ClassScheduleService {
  /**
   * class scheduel serv depends on class repo to handle class rel. db ops
   * @param classScheduleRepository
   */
  constructor(private classScheduleRepository: typeof ClassScheduleRepository) {
    this.classScheduleRepository = classScheduleRepository;
  }

  /**
   * gets all classses assoaicted to a user
   * @returns an array of classes
   */
  public async getUserClasses(userId: number) {
    const classes = await this.classScheduleRepository.getUserClasses(userId);
    return classes;
  }

  /**
   * updates the classes associated to a given user
   * @returns an array of classes
   */
  public async updateUserClasses(userId: number, classIds: number[]) {}

  public async deleteUserClasses() {
    // del all of them on user delet
  }

  /**
   * should be able to  del and update the classes etc
   */
}
