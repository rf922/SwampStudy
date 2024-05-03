import { Match } from "./../entities/match.entity";
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

  /**
   * creates a match entry between user1 and user 2
   * @param userId1
   * @param userId2
   * @returns
   */
  public async createMatch(userId1: number, userId2: number) {
    if (await this.matchExists(userId1, userId2)) {
      throw new Error("Match already exists");
    }
    const match = await this.matchRepository.createMatch(userId1, userId2);
    return match;
  }

  /**
   * method to get a specific like corresponding to user1Id as the
   * liker and userId2 as the user liked
   * @param userId1
   * @param userId2
   * @returns
   */
  public async getMatch(userId1: number, userId2: number) {
    const match = await this.matchRepository.getMatch(userId1, userId2);
    return this.formatMatch(userId1, match);
  }

  /**
   * gets a users match entries
   * @param userId
   * @returns
   */
  public async getMatches(userId: number) {
    const matches = await this.matchRepository.getUserMatchesById(userId);
    return this.formatMatches(userId, matches);
  }

  private formatMatch(userId?: number, match?: Match) {
    const now = new Date();
    const recentThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // recent check 7 days ago

    return {
      user: match?.userOne?.id !== userId ? match.userOne : match.userTwo,
      email: "", //is in the rel user
      recent: new Date(match.createdAt) > recentThreshold, // mark as recent
      date: match.createdAt,
      location: "Not specified", // default to "Not specified"
      courses: [], //fill later
    };
  }

  private formatMatches(userId: number, matches: Match[]) {
    return matches.map((match) => this.formatMatch(userId, match));
  }

  /**
   * checks for the existence of a match btwn users
   * @param userId
   * @param userId2
   * @returns true if found
   */
  public async matchExists(userId: number, userId2: number) {
    return await this.matchRepository.matchExists(userId, userId2);
  }
}
