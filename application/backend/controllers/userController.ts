import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entities/users.entity";
import { validate } from "class-validator";

export const postUser = async (req: Request, res: Response) => {
  const user = await myDataSource.getRepository(User).create(req.body);

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(422);
    console.log("Data Validation Failed");
    res.send("Failed Data Validation");
  } else {
    try {
      const results = await myDataSource.getRepository(User).insert(user);
      res.send(results);
    } catch (error) {
      res.status(422);
      res.send("Duplicate Request or DB Error");
    }
  }
};
