import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Like } from "../entities/like.entity";
import { validate } from "class-validator";
import { Account } from "../entities/account.entity";

export const postLike = async (req: Request, res: Response) => {
  const like = await myDataSource.getRepository(Like).create(req.body);
  const errors = await validate(like);

  if (errors.length > 0) {
    res.status(422);
    res.send("Failed Data Validation");
  } else {
    try {
      const results = await myDataSource.getRepository(Like).insert(like);
      const liker = req.body.liker;
      console.log("Liker IS: ", liker);
      const liked = req.body.liked;
      //const liked = req.body.liked;
      res.send(results);
      //Need to check whether there is a counter like somewhere
      const potential_match = await myDataSource
        .createQueryBuilder()
        .select("like")
        .from(Like, "like")
        .where("likerId = :likerID AND likedId = :likedID", {
          likerID: liked,
          likedID: liker,
        })
        .getOne();
      if (potential_match) {
        console.log(potential_match);
        console.log("Match");
      }
    } catch (error) {
      res.status(422);
      console.log(error);
      res.send("Duplicate Request or DB Error");
    }
  }
};
