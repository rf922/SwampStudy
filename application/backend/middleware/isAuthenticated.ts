import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.userId) {
    next(); // to the next middleware or route handler
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User is not authenticated." });
  }
};
