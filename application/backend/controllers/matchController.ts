import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Match } from "../entities/match.entity";

//Using the QueryBuilder to get the results
export const getMatch = async (req: Request, res: Response) => {
  const id = req.body.userId;
  const results = await myDataSource
    .getRepository(Match)
    .createQueryBuilder("match")
    .leftJoinAndSelect("match.users", "account")
    .where("match.users = :userID", { userID: id })
    .getMany();
  res.json(results);
};
