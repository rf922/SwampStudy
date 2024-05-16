import { Class } from "./../entities/class.entity";
import { ClassRepository } from "./../repositories/ClassRepository";

/**
 * class service to handle class related business logic and uses
 * a repo to handle db ops
 */
export class ClassService {
  /**
   * class serv depends on class repo to handle class rel. db ops
   * @param classRepository
   */
  constructor(private classRepository: typeof ClassRepository) {
    this.classRepository = classRepository;
  }

  /**
   * gets all classses
   * @returns an array of classes
   */
  public async getAllClasses() {
    const classes = await this.classRepository.getAllClasses();
    return classes;
  }

  /**
   * gets all classes grouped by department
   * @returns a map with k=department v=class
   */
  public async getAllClassesByDepartment() {
    const classes = await this.getAllClasses();
    const classesByDep = this.groupClassesByDepartment(classes);
    return classesByDep;
  }

  public async getClassById(classId: number) {
    return await this.classRepository.getClassById(classId);
  }

  /**
   * private helper method used to group classes by department
   * @param classes
   * @returns a map with k = department v= classes
   */
  private async groupClassesByDepartment(classes: Class[]) {
    const classesByDep = classes.reduce((acc, cls) => {
      //reduce on class array
      const { department } = cls; // grab the classes dep
      if (!acc[department]) {
        //check for its presence in the map if absent
        acc[department] = []; //init it
      }
      acc[department].push(cls); //push the class
      return acc; //return the map
    }, {}); //init val empty
    return classesByDep;
  }
}
