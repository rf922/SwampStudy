import { myDataSource } from "./../app-data-source";
import { Like } from "./../entities/like.entity";

/**
 * custom repo for handling like related db ops. - data layer
 */
export const LikeRepository = myDataSource.getRepository(Like).extend({
  /**
   * db ops related to Like go in here to be then used in services layer
   */
});
