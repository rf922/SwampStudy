import { Class } from "./../entities/class.entity";
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
      initClasses,
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
   * get the classes in common between two users by userId1 and UserId2
   * @returns an array of common classes
   */
  public async getClassesInCommon(userId1: number, userId2: number) {
    const userOneClassSchedule =
      await this.classScheduleRepository.getUserClasses(userId1);
    const userTwoClassSchedule =
      await this.classScheduleRepository.getUserClasses(userId2);

    const userOneClasses: Set<number> = new Set(
      userOneClassSchedule.map((schedule) => schedule.class.id),
    );
    const userTwoClasses: Set<number> = new Set(
      userTwoClassSchedule.map((schedule) => schedule.class.id),
    );
    const commonClassIds = await this.getScheduleOverlap(
      userOneClasses,
      userTwoClasses,
    );

    const allClasses = [...userOneClassSchedule, ...userTwoClassSchedule].map(
      (schedule) => schedule.class,
    );

    const commonClasses: Class[] = allClasses.filter((classItem) =>
      commonClassIds.includes(classItem.id),
    );

    return commonClasses;
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

  /**
   * should be able to  del and update the classes etc
   */
}
