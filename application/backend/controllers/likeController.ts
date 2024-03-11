import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Like } from "../entities/like.entity";
import { validate } from "class-validator";

export const postLike = async (req: Request, res: Response) => {
  const like = await myDataSource.getRepository(Like).create(req.body);
  const errors = await validate(like);

  if (errors.length > 0) {
    res.status(422);
    res.send("Failed Data Validation");
  } else {
    try {
      const results = await myDataSource.getRepository(Like).insert(like);
      res.send(results);
    } catch (error) {
      res.status(422);
      console.log(error);
      res.send("Duplicate Request or DB Error");
    }
  }
};
