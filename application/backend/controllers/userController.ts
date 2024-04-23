import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SessionService } from "./../services/SessionService";
import { UserService } from "./../services/UserService";

/**
 * user controller responsible for handing http request and sending respnse data
 */
export class UserController {
  /**
   * user controller depends on userService to handle user related ops and a
   * session service to handle session related ops
   * @param userService
   * @param sessionService
   */
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {
    this.userService = userService;
    this.sessionService = sessionService;
  }

  /**
   * register a new user
   * @param req
   * @param res
   * @returns a success message conveying that the user was registered
   */
  public async register(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, lastName, email, password, profilePicture } = req.body;
    const pic = !profilePicture ? "NA" : profilePicture;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Missing required fields.");
    }
    try {
      const message = await this.userService.registerUser(
        firstName,
        lastName,
        email,
        password,
        pic,
      );
      return res.status(StatusCodes.CREATED).send(message);
    } catch (error) {
      console.error(error);
      if (error.message) {
        switch (error.message) {
          case "409":
            return res
              .status(StatusCodes.CONFLICT)
              .send("A user with that email already exists.");
          default:
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .send("Unknown error");
        }
      }
    }
  }

  /**
   * handles the logging in of existing users
   * @param req
   * @param res
   * @returns an appropriate http response on succ or failure
   */
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      // check params
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Email and password are required.");
    }
    try {
      const userId = await this.userService.loginUser(email, password);
      await this.sessionService.createSession(req.session, email);
      return res
        .status(StatusCodes.OK)
        .send(`Login successful for user ID ${userId}`);
    } catch (error) {
      console.error(error);
      if (error.message) {
        switch (error.message) {
          case "401":
            return res
              .status(StatusCodes.UNAUTHORIZED)
              .send("Invalid password");
          case "404":
            return res.status(StatusCodes.NOT_FOUND).send("User Not Found");
          default:
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .send("Unknown error");
        }
      }
    }
  }

  /**
   * handles the logout of users
   * @param req
   * @param res
   */
  public async logout(req: Request, res: Response) {
    try {
      //destory the session,
      await this.sessionService.destroySession(req);
      res.status(StatusCodes.OK).send("Logged out successfully");
    } catch (error) {
      console.error("Error deleting session from DB:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error during logout");
    }
  }
}
