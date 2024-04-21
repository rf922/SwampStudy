import { myDataSource } from "../app-data-source";
import { ClassSchedule } from "../entities/classschedule.entity";

/**
 * class scheduel repo extends typeorms repo to handle our user class schuedl related
 * db ops and abstract away that logic from the service layer
 */
export const ClassScheduleRepository = myDataSource
  .getRepository(ClassSchedule)
  .extend({
    /**
     * get all classes associated to a given account
     * @returns an array of objects with classscheduel id and the class
     */
    async getUserClasses(userId: number) {
      return this.find({
        where: { account: { user_FK: { id: userId } } },
        relations: ["class"],
      });
    },

    async addUserClass(userId: number, classId: number) {},

    /**
     * adds all classes as schedule entries for given userId
     * @param userId
     * @param classesToAdd
     */
    async addAllClassesToSchedule(userId: number, classesToAdd: number[]) {
      const scheduleEnts = classesToAdd.map((classId) => {
        return this.create({// the schedule entries for userId and each classId
          account: { id: userId }, 
          class: { id: classId }, 
        });
      });

      return this.save(scheduleEnts); // bulk sav
    },

    /**
     * rm all classes from the schedule for a given userId.
     * @param userId id of the usrr
     * @param classesToRemove Array of class id to rm
     */
    async removeAllClassesFromSchedule(
      userId: number,
      classesToRemove: number[],
    ) {
      const scheduleEntriesToRemove = await this.find({
        //schedule entries that need to be removed
        where: classesToRemove.map((classId) => ({
          //match cls id & usrId
          account: { id: userId },
          class: { id: classId },
        })),
      });
      return this.remove(scheduleEntriesToRemove);
    },
  });

export default ClassScheduleRepository;
