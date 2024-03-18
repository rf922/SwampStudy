import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const checkSession = (req: Request, res: Response) => {
  if (req.session?.userId) {
    // sess exists, user is considered authenticated
    res
      .status(StatusCodes.OK)
      .json({ isLoggedIn: true, userId: req.session.userId });
  } else {
    res.status(StatusCodes.OK).json({ isLoggedIn: false });
  }
};

/**
 * More authentication functions to come ! ...
 */
