import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { StatusCodes } from "http-status-codes";
import { User } from "../entities/user.entity";
import { Account } from "../entities/account.entity";

import { Session } from "../entities/session.entity";
import { validate } from "class-validator";
import { hash, compare } from "bcrypt";

export const postUser = async (req: Request, res: Response) => {
  const user = myDataSource.getRepository(User).create(req.body);

  const errors = await validate(user);
  if (errors.length > 0) {
    console.log("Data Validation Failed");
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send("Failed Data Validation");
  }

  try {
    const results = await myDataSource.getRepository(User).insert(user);
    return res.status(StatusCodes.CREATED).send(results);
  } catch (error) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send("Duplicate Request or DB Error");
  }
};

export const register = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing required fields.");
  }

  const existingUser = await myDataSource
    .getRepository(User)
    .findOneBy({ email });
  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).send("User already exists.");
  }
  const hashedPassword = await hash(password, 10);

  try {
    await myDataSource.transaction(async (transactionalEntityManager) => {
      // create the user
      const user = transactionalEntityManager.create(User, {
        email: email,
        password: hashedPassword,
      });

      // validate user
      const userErrors = await validate(user);
      if (userErrors.length > 0) {
        throw new Error("Failed User Data Validation");
      }

      const newUser = await transactionalEntityManager.save(User, user);

      // create and validate the account entity
      const account = transactionalEntityManager.create(Account, {
        first_name: firstName,
        last_name: lastName,
        profile_picture: "picture that well put in s3 bucket",
        user_FK: newUser,
      });

      const accountErrors = await validate(account);
      if (accountErrors.length > 0) {
        throw new Error("Failed Account Data Validation");
      }

      await transactionalEntityManager.save(Account, account);
    });

    return res
      .status(StatusCodes.CREATED)
      .send(`User and account registered with email: ${email}`);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // check params
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Email and password are required.");
  }
  try {
    const user = await myDataSource.getRepository(User).findOneBy({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send("User not found.");
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials.");
    }

    req.session.userId = user.id;
    return res.status(StatusCodes.OK).send("Login successful.");
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("An error occurred during login.");
  }
};

export const logout = async (req: Request, res: Response) => {
  const sessionId = req.sessionID; // Get the session ID
  if (!sessionId) {
    return res.status(StatusCodes.BAD_REQUEST).send("Session not found.");
  }

  req.session.destroy(async (err) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error during logout");
    }
    res.clearCookie("connect.sid");

    try {
      await myDataSource.getRepository(Session).delete({ id: sessionId });
      res.status(StatusCodes.OK).send("Logged out successfully");
    } catch (error) {
      console.error("Error deleting session from DB:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error during logout");
    }
  });
};
