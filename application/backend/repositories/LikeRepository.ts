import { myDataSource } from "./../app-data-source";
import { Like } from "./../entities/like.entity";

/**
 * custom repo for handling like related db ops. - data layer
 */
export const LikeRepository = myDataSource.getRepository(Like).extend({
  /**
   * db ops related to Like go in here to be then used in services layer
   */

  /**
   * creates a like entry where userLikerId likes userLikeId
   * @param userLikerId
   * @param userLikeId
   */
  async createLike(userLikerId: number, userLikeId: number) {
    return await this.create({
      liker: { id: userLikerId },
      liked: { id: userLikeId },
    }).save();
  },

  /**
   * method to get a like where userId1 likes userId2
   * @param userId1
   * @param userId2
   * @returns
   */
  async getLike(userId1: number, userId2: number) {
    return await this.createQueryBuilder("like")
      .where("like.likerId = :userId1", { userId1 })
      .andWhere("like.likedId = :userId2", { userId2 })
      .getOne();
  },
});
