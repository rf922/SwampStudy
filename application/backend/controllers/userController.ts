import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { StatusCodes } from "http-status-codes";
import { User } from "../entities/users.entity";
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
  const { username, email, password } = req.body;
  console.log(JSON.stringify(req.body));

  const existingUser = await myDataSource
    .getRepository(User)
    .findOneBy({ email });
  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).send("User already exists.");
  }

  const hashedPassword = await hash(password, 10);

  // Create a new user entity with the hashed password
  const user = new User();
  user.email = email;
  user.password = hashedPassword;

  try {
    // Save user to the db
    const newUser = await myDataSource.getRepository(User).save(user);
    return res
      .status(StatusCodes.CREATED)
      .send(`User registered with email: ${newUser.email}`);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error registering the user.");
  }
};

export const login = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { username, email, password } = req.body;
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

  return res.status(StatusCodes.OK).send("Login successful.");
};
