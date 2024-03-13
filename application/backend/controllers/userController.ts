import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { StatusCodes } from "http-status-codes";
import { User } from "../entities/users.entity";
import { Account } from "../entities/account.entity";
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
  console.log(JSON.stringify(req.body));

  const existingUser = await myDataSource
    .getRepository(User)
    .findOneBy({ email });
  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).send("User already exists.");
  }

  const hashedPassword = await hash(password, 10);

  // Create a new user entity with hashed password
  const user = new User();
  user.email = email;
  user.password = hashedPassword;

  const userErrors = await validate(user);
  if (userErrors.length > 0) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send("Failed User Data Validation");
  }

  // create account
  const newUser = await myDataSource.getRepository(User).save(user);
  const account = new Account();
  account.first_name = firstName;
  account.last_name = lastName;

  account.profile_picture = "picture that well put n s3 bucket"; // placeholder
  account.user_FK = newUser; // fk user

  const accountErrors = await validate(account);
  if (accountErrors.length > 0) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send("Failed Account Data Validation");
  }

  await myDataSource.getRepository(Account).save(account);
  return res
    .status(StatusCodes.CREATED)
    .send(`User and account registered with email: ${newUser.email}`);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.status(StatusCodes.OK);
  const existingUser = await myDataSource
    .getRepository(User)
    .findOneBy({ email });
  if (!existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).send("User Does Not exist.");
  }

  const isPasswordMatch = await compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid password.");
  }
  req.session.userId = existingUser.id;

  return res.status(StatusCodes.OK).send("Login successful.");
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(StatusCodes.BAD_GATEWAY).send("Could not log out");
    }
    res.status(StatusCodes.OK).send("Logged Out ..");
  });
};

export const loginStatus = (req: Request, res: Response) => {
  if (req.session.userId) {
    res.status(StatusCodes.OK).json({ isLoggedIn: true });
  } else {
    res.status(StatusCodes.OK).json({ isLoggedIn: false });
  }
};
