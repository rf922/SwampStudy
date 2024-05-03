import { MatchRepository } from "./../repositories/MatchRepository";
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
  constructor(
    private likeRepository: typeof LikeRepository,
    private matchRepository: typeof MatchRepository,
  ) {
    this.likeRepository = likeRepository;
    this.matchRepository = MatchRepository;
  }
  /**
   * like related methods go here, db ops go in the repository it self
   *
   */

  /**
   * function to create a like between user one and user two where
   * userIdOne likes userIdTwo
   * @param userIdOne
   * @param userIdTwo
   * @returns
   */
  public async createLike(userIdOne: number, userIdTwo: number) {
    const likeEnt = await this.likeRepository.getLike(userIdOne, userIdTwo);
    if (likeEnt) {
      throw new Error("Already liked that account :" + JSON.stringify(likeEnt));
    }
    const like = await this.likeRepository.createLike(userIdOne, userIdTwo);
    return like;
  }

  public async getLike(userIdOne: number, userIdTwo: number) {
    const likeEnt = await this.likeRepository.getLike(userIdOne, userIdTwo);
    return likeEnt;
  }
}
