import { validate } from "class-validator";
import { myDataSource } from "./../app-data-source";
import { Match } from "./../entities/match.entity";
import { Class } from "./../entities/class.entity";

/**
 * handles match entity db ops
 */
export const MatchRepository = myDataSource.getRepository(Match).extend({
  /**
   * creates a match entry for user1 and user2
   */
  async createMatch(
    userId1: number,
    userId2: number,
    meetingLink?: string,
    courses?: Class[],
  ) {
    const createdMatch = await this.create({
      userOne: { id: userId1 },
      userTwo: { id: userId2 },
      classes: courses,
      meetingDateTime: null,
      meetingLink: meetingLink,
    });
    if (validate(createdMatch)) {
      await createdMatch.save();
    }
    return createdMatch;
  },

  /**
   * updates the associated meeting date for a match by matchId
   * @param matchId
   * @param newDateTime
   * @returns
   */
  async setMatchDate(matchId: number, meetingDate: Date | string) {
    const match = await this.findOneBy({ id: matchId });
    if (match) {
      match.meetingDateTime =
        typeof meetingDate === "string" ? new Date(meetingDate) : meetingDate;
      await this.save(match);
      return match;
    }
    return null; // nul when not found
  },

  /**
   * checks for the existence of a match entry between users 1 and 2
   * @param userId1
   * @param userId2
   * @returns
   */
  async matchExists(userId1: number, userId2: number): Promise<boolean> {
    const matchCount = await this.count({
      where: [
        { userOne: { id: userId1 }, userTwo: { id: userId2 } }, //user1 liked usr 2
        { userOne: { id: userId2 }, userTwo: { id: userId1 } }, //usr2 liked usr1
      ],
    });
    return matchCount > 0;
  },

  /**
   * gets a single match entity based on user ids, including related entities.
   * @param userId1
   * @param userId2
   * @returns A match entity with related user details and classes or null.
   */
  async getMatch(userId1: number, userId2: number): Promise<Match | null> {
    const match = await this.findOne({
      where: {
        userOne: { id: userId1 },
        userTwo: { id: userId2 },
      },
      relations: [
        "userOne",
        "userOne.ratings",
        "userOne.user_FK",
        "userTwo",
        "userTwo.ratings",
        "userTwo.user_FK",
        "classes",
      ],
    });

    return match;
  },

  /**
   * gets a single match entity based on user ids, with related entities.
   * @param userId1
   * @param userId2
   * @returns A match entity with related user details and classes or null.
   */
  async getUserMatch(userId1: number, userId2: number): Promise<Match | null> {
    const matches = await this.find({
      where: [{ userOne: { id: userId1 }, userTwo: { id: userId2 } }],
      relations: [
        "userOne",
        "userOne.ratings",
        "userOne.user_FK",
        "userTwo",
        "userTwo.ratings",
        "userTwo.user_FK",
        "classes",
      ],
    });

    return matches.length > 0 ? matches[0] : null;
  },

  /**
   * gets match entries for a user by userId,
   * @param userId
   * @returns
   */
  async getUserMatchesById(userId: number) {
    return await this.find({
      where: [{ userOne: { id: userId } }, { userTwo: { id: userId } }],
      relations: [
        "userOne",
        "userOne.ratings",
        "userOne.user_FK",
        "userTwo",
        "userTwo.ratings",
        "userTwo.user_FK",
        "classes",
      ],
    });
  },
});
