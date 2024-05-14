import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AccountService } from "./../services/AccountService";
import { SessionService } from "./../services/SessionService";
import { RatingService } from "./../services/RatingService";
/**
 * account controller responsible for handling incoming requests,
 * encapsulates the request handling for account-rel actions
 */
export class AccountController {
  /**
   * receives account service and session services adn assigns them to private instance variables
   * to be used throughout the classes methods
   * @param accountService
   * @param sessionService
   * @param ratingService
   */
  constructor(
    private accountService: AccountService,
    private sessionService: SessionService,
    private ratingService: RatingService,
  ) {
    this.accountService = accountService;
    this.sessionService = sessionService;
    this.ratingService = ratingService;
  }

  /**
   * gets a users account by using the passed accountId
   * @param req
   * @param res
   * @returns result // account
   */
  public async getAccount(req: Request, res: Response) {
    const accountId = parseInt(req.params.id);
    try {
      if (!accountId) {
        res.status(StatusCodes.BAD_REQUEST).send("Missing Request Params");
      }
      const account = await this.accountService.getAccount(accountId);
      if (!account) {
        res.status(StatusCodes.NOT_FOUND).send("Account not found");
      }
      return res.status(StatusCodes.ACCEPTED).send(account);
    } catch (error) {
      switch (error?.message) {
        case "404":
          return res.status(StatusCodes.NOT_FOUND).send("Account not found");
        default:
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Unable to get Account");
      }
    }
  }

  /**
   * uses users session Id to get their account details
   * @param req
   * @param res
   * @returns
   */
  public async getAccountDetails(req: Request, res: Response) {
    const userId = req.session.userId;
    try {
      const account = await this.accountService.getAccountDetails(userId);
      const rating = await this.ratingService.getRating(userId);
      return res.status(StatusCodes.CREATED).send({ ...account, rating });
    } catch (error) {
      switch (error?.message) {
        case "404":
          return res.status(StatusCodes.NOT_FOUND).send("Account not found");
        default:
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Unable to retrieve account details");
      }
    }
  }

  /**
   * Handles updating a users account with chanes to either firstName, lastName, email or password
   * @param req
   * @param res
   *
   */
  public async updateAccount(req: Request, res: Response) {
    const userId = req.session.userId;
    /** account settings front end vars need to be changed to match this and the db */
    const {
      first_name,
      last_name,
      email,
      newPassword,
      profile_picture,
      weekavailability,
      introvert,
      isHidden,
      biography,
    } = req.body;

    try {
      await this.accountService.updateAccount(
        userId,
        first_name,
        last_name,
        email,
        newPassword,
        profile_picture,
        weekavailability,
        introvert,
        isHidden,
        biography,
      );
      res.status(StatusCodes.OK).send("Account updated successfully.");
    } catch (error) {
      switch (error?.message) {
        case "404":
          return res.status(StatusCodes.NOT_FOUND).send("Account not found");
        case "400":
          return res.status(StatusCodes.BAD_REQUEST).send("Invalid params");
        default:
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Unable to update account details");
      }
    }
  }

  /**
   * handles the deletion of a user account and related data
   * @param req
   * @param res
   * @returns
   */
  public async deleteAccount(req: Request, res: Response) {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send("User not logged in.");
    }

    try {
      await this.accountService.deleteAccount(userId);
      await this.sessionService.destroySession(req);
      res.clearCookie("connect.sid");
      return res.status(StatusCodes.OK).send("Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting account:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error deleting account.");
    }
  }
}
