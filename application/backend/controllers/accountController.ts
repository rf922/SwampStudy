import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Account } from "../entities/account.entity";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

export const getAccount = async (req: Request, res: Response) => {
  const results = await myDataSource
    .getRepository(Account)
    .findOneBy({ id: req.params.id as unknown as number });
  if (results === null) {
    res.status(StatusCodes.NOT_FOUND).send("Resource not Found"); 
  } else {
    return res.send(results);
  }
};

export const details = async (req: Request, res: Response) => {
  const userId = req.session.userId;

  try {
    const result = await myDataSource
      .getRepository(Account)
      .findOneBy({ id: userId as unknown as number });
    if (result === null) {
      res.status(StatusCodes.NOT_FOUND).send("Resource not Found");
    } else {
      return res.send(result);
    }

    const accountData = {
      id: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      profilePicture: result.profile_picture,
    };

    return res.status(StatusCodes.CREATED).send(accountData);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Duplicate Request or DB Error");
  }
};

export const postAccount = async (req: Request, res: Response) => {
  const account = await myDataSource.getRepository(Account).create(req.body);
  const errors = await validate(account);

  if (errors.length > 0) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send("Failed Data Validation"); // Use StatusCodes.UNPROCESSABLE_ENTITY for 422
  } else {
    try {
      const results = await myDataSource.getRepository(Account).insert(account);
      res.status(StatusCodes.CREATED).send(results); // Use StatusCodes.CREATED for successful creation
    } catch (error) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send("Duplicate Request or Invalid Key or DB Error"); // Reuse StatusCodes.UNPROCESSABLE_ENTITY for 422 errors
    }
  }
};
