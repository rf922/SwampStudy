import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SessionService } from "./../services/SessionService";

/**
 * authentication controller responsible for handling incoming requests,
 * encapsulates the request handling for auth-rel actions
 */
export class AuthenticationController {
  /**
   * accepts a seesionService used to perform business logic related to sessions
   * @param sessionService
   */
  constructor(private sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  /**
   * checks the current user's session to determine their login status,
   * uses SessionService to asses the presence/ validity of the session
   * @param req
   * @param res
   */
  public async checkSession(req: Request, res: Response) {
    const sessionResult = await this.sessionService.checkSession(req.session);
    if (sessionResult.isLoggedIn) {
      res
        .status(StatusCodes.OK)
        .json({ isLoggedIn: true, userId: sessionResult.userId });
    } else {
      res.status(StatusCodes.OK).json({ isLoggedIn: false });
    }
  }

  /**
   * More authentication functions to come ! ...
   */
}
