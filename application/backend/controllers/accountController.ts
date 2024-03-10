import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Account } from "../entities/account.entity";
import { validate } from "class-validator"; //import {Validate, validate}

export const getAccount = async (req: Request, res: Response) => {
  const results = await myDataSource
    .getRepository(Account)
    .findOneBy({ id: req.params.id as unknown as number });
  if (results === null) {
    res.status(404);
    res.send("Resource not Found");
  } else {
    return res.send(results);
  }
};

export const postAccount = async (req: Request, res: Response) => {
  const account = await myDataSource.getRepository(Account).create(req.body);
  const errors = await validate(account);

  if (errors.length > 0) {
    res.status(422);
    res.send("Failed Data Validation");
  } else {
    try {
      const results = await myDataSource.getRepository(Account).insert(account);
      res.send(results);
    } catch (error) {
      res.status(422);
      res.send("Duplicate Request or Invalid Key or DB Error");
    }
  }
};
