import { MatchRepository } from "./../repositories/MatchRepository";

/**
 * match service to handle match logic
 */
export class MatchService {
  /**
   * depends on match repository
   * @param matchRepository
   */
  constructor(private matchRepository: typeof MatchRepository) {
    this.matchRepository = matchRepository;
  }
}
