import { myDataSource } from "./../app-data-source";
import { Match } from "./../entities/match.entity";

/**
 * handles match entity db ops
 */
export const MatchRepository = myDataSource.getRepository(Match).extend({});
