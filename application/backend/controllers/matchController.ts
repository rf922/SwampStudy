import { Request, Response } from "express";
import { myDataSource } from "./../app-data-source";
import { Match } from "./../entities/match.entity";
import { MatchService } from "./../services/MatchService";

export class MatchController {
  constructor(private matchService: MatchService) {
    this.matchService = matchService;
  }
  //Using the QueryBuilder to get the results
  //Accout.id exists due to joining
  public async getMatch(req: Request, res: Response) {
    const id = req.body.userId;
    const matches = await myDataSource
      .getRepository(Match)
      .createQueryBuilder("match")
      .innerJoin("match.users", "account")
      .where("account.id = :userID", { userID: id })
      .getMany();
    res.json(matches);
  }
}
