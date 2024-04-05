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
}
