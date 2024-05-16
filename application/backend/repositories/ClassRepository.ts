import { myDataSource } from "./../app-data-source";
import { Class } from "./../entities/class.entity";

/**
 * class repo extends typeorms repo to handle our class related
 * db ops and abstract away that logic from the service layer
 */
export const ClassRepository = myDataSource.getRepository(Class).extend({
  /**
   * get all clsses in the db
   * @returns
   */
  async getAllClasses() {
    return this.find();
  },

  /**
   * function to return single class by classId
   * @param classId
   */
  async getClassById(classId: number) {
    return await this.findOneBy({ id: classId });
  },
});

export default ClassRepository;
