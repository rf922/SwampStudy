import { RatingRepository } from "./../repositories/RatingRepository";
/**
 * services layer for rating , here perform cals, and use
 * the repo to call for the db ops needed
 */
export class RatingService {
  /**
   * rating service right now only depends on the rating repo but
   * later expand the constructor with dependencies if needed
   */
  constructor(private ratingRepository: typeof RatingRepository) {
    this.ratingRepository = ratingRepository;
  }

  async submitRating(rating: number, userId: number) {
    //for dev rm later pos., returns the created entry
    const ratingEntry = await this.ratingRepository.createRating(
      rating,
      userId,
    );
    return ratingEntry;
  }

  /**
   * gets a user rating average by UserId
   * @param userId
   * @returns
   */
  async getRating(userId: number) {
    const rating = await this.ratingRepository.getUserRatingById(userId);
    return rating;
  }
}
