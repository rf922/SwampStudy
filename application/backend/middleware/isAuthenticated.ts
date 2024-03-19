import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

//midleware to protect certain routes checks that a user has a valid session
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.session);
  if (req.session?.userId) {
    console.log("Session Authenticated");
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "User is not authenticated." + JSON.stringify(req.session),
    });
  }
};
