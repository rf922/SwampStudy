import { myDataSource } from "./../../backend/app-data-source";
import { Session } from "./../entities/session.entity";

/**
 * custome session repo for handing session db related manipulation
 */
export const SessionRepository = myDataSource.getRepository(Session).extend({
  async hardDelete(sessionId: string) {
    //removes session from db
    return await this.delete({ id: sessionId });
  },
  /* temp to add sess db ops here, more to come */
});
