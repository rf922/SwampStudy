import { myDataSource } from "./../app-data-source";
import { Session } from "./../entities/session.entity";

/**
 * custome session repo for handing session db related manipulation
 */
export const SessionRepository = myDataSource.getRepository(Session).extend({
  async hardDelete(sessionId: string) {
    //removes session from db
    return await this.delete({ id: sessionId });
  },

  /**
   * gets active sessions i.e those sessions whose destroyedat value is not null
   * @returns
   */
  async getActiveSessions() {
    const groupedSessions = await this.createQueryBuilder("session")
      .select("JSON_UNQUOTE(JSON_EXTRACT(session.json, '$.userId'))", "userId")
      .addSelect("COUNT(*)", "sessionCount")
      .where("session.destroyedAt IS NULL")
      .groupBy("userId")
      .getRawMany();

    return groupedSessions;
  },
});
