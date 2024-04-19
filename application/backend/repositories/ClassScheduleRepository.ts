import { myDataSource } from "../app-data-source";
import { ClassSchedule } from "../entities/schedule_entity";

/**
 * class scheduel repo extends typeorms repo to handle our user class schuedl related
 * db ops and abstract away that logic from the service layer
 */
export const ClassScheduleRepository = myDataSource
  .getRepository(ClassSchedule)
  .extend({
    /**
     * get all classes associated to a given account
     * @returns an array of classes
     */
    async getUserClasses(userId: number) {
      //    return this.find();
    },

    async addUserClass(userId: number, classId: number) {},

    async deleteUserClass(userId: number, classId: number) {},
  });

export default ClassScheduleRepository;
