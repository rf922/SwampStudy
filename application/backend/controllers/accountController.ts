import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AccountService } from "./../services/AccountService";
import { SessionService } from "./../services/SessionService";

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
   */
  constructor(
    private accountService: AccountService,
    private sessionService: SessionService,
  ) {
    this.accountService = accountService;
    this.sessionService = sessionService;
  }

  /**
   * gets a users account by using the passed accountId
   * @param req
   * @param res
   * @returns result // account
   */
  public async getAccount(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).send("Missing Request Params");
    }
    const results = await this.accountService.getAccount(id);
    if (results === null) {
      res.status(StatusCodes.NOT_FOUND).send("Resource not Found");
    } else {
      return res.send(results);
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
      const result = await this.accountService.getAccountDetails(userId);
      return res.status(StatusCodes.CREATED).send(result);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Duplicate Request or DB Error : " + error.message);
    }
  }

  /*
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
  */

  /**
   * Handles updating a users account with chanes to either firstName, lastName, email or password
   * @param req
   * @param res
   *
   */
  public async updateAccount(req: Request, res: Response) {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send("User not logged in.");
    }

    const { firstName, lastName, email, newPassword } = req.body;
    try {
      await this.accountService.updateAccount(
        userId,
        firstName,
        lastName,
        email,
        newPassword,
      );
      res.status(StatusCodes.OK).send("Account updated successfully.");
    } catch (error) {
      console.error("Error updating account:", error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error updating account." + error.message);
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
