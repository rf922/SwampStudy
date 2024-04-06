import { myDataSource } from "./../app-data-source";
import { Rating } from "./../entities/rating.entity";

/**
 * handles the data layer for our rating related db ops,
 * keep the db ops here and clall them from the services layer
 */
export const RatingRepository = myDataSource.getRepository(Rating).extend({
  /**
   * todo implement etc ..
   */
});
