//bimport { Like } from "./../entities/like.entity";
import { LikeRepository } from "./../repositories/LikeRepository";

/**
 * like service layer to handle business logic
 */
export class LikeService {
  /**
   * include repo dependencies here, currently depends on likeRepo
   * all repos needed must be included here so as to work with the dependency injection
   * set up in DIContainer and server.ts
   * @param likeRepository
   */
  constructor(private likeRepository: typeof LikeRepository) {
    this.likeRepository = likeRepository;
  }
  /**
   * like related methods go here, db ops go in the repository it self
   *
   */
}
