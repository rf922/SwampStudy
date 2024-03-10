import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Match } from "../entities/match.entity";

//Using the QueryBuilder to get the results
export const getMatch = async (req: Request, res: Response) => {
  const id = req.body.userId;
  const results = await myDataSource
    .createQueryBuilder()
    .select("match")
    .from(Match, "match")
    .where("match.user1 = :user1ID", { user1ID: id })
    .orWhere("match.user2 = :user2ID", { user2ID: id })
    .getMany();
  res.json(results);
};
