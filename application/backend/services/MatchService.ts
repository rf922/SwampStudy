import { Rating } from "./../entities/rating.entity";
import { Match } from "./../entities/match.entity";
import { MatchRepository } from "./../repositories/MatchRepository";
import { v4 as uuidv4 } from "uuid";

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
    const meetingLink = await this.createMeetingLink();
    const match = await this.matchRepository.createMatch(
      userId1,
      userId2,
      meetingLink,
    );
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

  /**
   * updates a matches meeting date by matchId
   * @param matchId
   * @param newMeetingDate
   * @returns the updated match
   */
  public async updateMatchDate(matchId: number, newMeetingDate: string) {
    const date = new Date(newMeetingDate);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const updatedMatch = await this.matchRepository.setMatchDate(matchId, date);
    return updatedMatch;
  }

  /**
   * helper function to generate a meeting link for the match
   *
   * @returns
   */
  private async createMeetingLink() {
    const uniqueId = this.generateUniqueId();
    const meetingLink = `https://meet.jit.si/${uniqueId}`;
    return meetingLink;
  }

  private formatMatch(userId?: number, match?: Match) {
    const now = new Date();
    const recentThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // recent check 7 days ago
    const requittingUser =
      match?.userOne?.id !== userId ? match.userOne : match.userTwo;
    return {
      id: match.id,
      userId: requittingUser.user_FK.id,
      first_name: requittingUser.first_name,
      last_name: requittingUser.last_name,
      biography: requittingUser.biography,
      profile_picture: requittingUser.profile_picture,
      weekavailability: requittingUser.weekavailability,
      rating: this.getAverageRating(requittingUser.ratings),
      email: requittingUser.user_FK.email, //is in the rel user
      recent: new Date(match.createdAt) > recentThreshold, // mark as recent
      date: match.meetingDateTime,
      meetingLink: match.meetingLink,
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

  /**
   * private helper that uses uuid to generate a unique id for the meeting link
   * this makes it highly unlikely that meeting links collide and adds sec
   * @returns
   */
  private generateUniqueId(): string {
    return `match-${uuidv4()}`;
  }

  /**
   * private helper getcs the users average rating
   * @param ratings
   * @returns
   */
  private getAverageRating(ratings: Rating[]) {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return 0; //defaul 0
    }
    const total = ratings.reduce((acc, { rating }) => acc + rating, 0);
    const average = total / ratings.length;
    return average;
  }
}
