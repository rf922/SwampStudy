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
  public async getUserClassesById(userId: number) {
    const classes = await this.classScheduleRepository.getUserClasses(userId);
    return classes;
  }

  /**
   * updates the classes associated to a given user
   * @returns an array of classes
   */
  public async updateUserClasses(userId: number, updatedClasses: number[]) {
    const usrSchedule =
      await this.classScheduleRepository.getUserClasses(userId);
    const initClasses: Set<number> = new Set(
      usrSchedule.map((schedule) => schedule.class.id),
    );
    const changedClasses = new Set(updatedClasses);
    const addedClasses = await this.getScheduleDifference(
      initClasses,
      changedClasses,
    );
    const removedClasses = await this.getScheduleDifference(
      changedClasses,
      initClasses
    );

    if (addedClasses.length !== 0) {
      await this.classScheduleRepository.addAllClassesToSchedule(
        userId,
        addedClasses,
      );
    }

    if (removedClasses.length !== 0) {
      await this.classScheduleRepository.removeAllClassesFromSchedule(
        userId,
        removedClasses,
      );
    }

    return "success";
  }

  /**
   * heper to get an array of classes that are in scheduleA but not schedule B
   * @param scheduleA
   * @param scheduleB
   */
  private async getScheduleDifference(
    scheduleA: Set<number>,
    scheduleB: Set<number>,
  ) {
    const diff = [...scheduleB].filter((id) => !scheduleA.has(id));
    return diff;
  }

  /**
   * heper to get an array of classes that are in scheduleA and schedule B
   * @param scheduleA
   * @param scheduleB
   */
  private async getScheduleOverlap(
    scheduleA: Set<number>,
    scheduleB: Set<number>,
  ) {
    const intersection = [...scheduleB].filter((id) => scheduleA.has(id));
    return intersection;
  }

  public async deleteUserClasses() {
    // del all of them on user delet
  }

  /**
   * should be able to  del and update the classes etc
   */
}
