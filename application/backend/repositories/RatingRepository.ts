import { Account } from "./../entities/account.entity";
import { myDataSource } from "./../app-data-source";
import { Rating } from "./../entities/rating.entity";

/**
 * handles the data layer for our rating related db ops,
 * keep the db ops here and clall them from the services layer
 */
export const RatingRepository = myDataSource.getRepository(Rating).extend({
  /**
   * submits a rating entry for the given userId
   */
  async createRating(rating: number, userId: number) {
    const ratingEntry = await this.create({
      //create & dave the entry
      rating: rating,
      account: { id: userId },
    }).save();
    return ratingEntry;
  },

  /**
   * gets the average of the ratings for a user corresponding to userId
   * @param userId
   * @returns
   */
  async getUserRatingById(userId: number) {
    const rating = await this.createQueryBuilder("rating")
      .where("rating.accountId = :accountId", { accountId: userId }) // by acc
      .select("AVG(rating.rating)", "average")
      .getRawOne();
    return rating.average === null ? 5 : parseFloat(rating.average);
  },
});
