import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
export const login = async (_req: Request, res: Response) => {
  //TODO actually implement log in functionality
  //    res.status(StatusCodes.OK).send("User logged in");
  const { username, password } = _req.body;
  res
    .status(StatusCodes.OK)
    .send("User logged in : " + username + " with key : " + password);
};

//TODO , VALIDATION , etc ..

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res
    .status(StatusCodes.OK)
    .send("Registerting user : " + username + " . :" + password);
};
