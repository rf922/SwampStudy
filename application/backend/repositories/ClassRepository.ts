import { myDataSource } from "./../../backend/app-data-source";
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
});

export default ClassRepository;
