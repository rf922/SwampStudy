import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SessionService } from "./../services/SessionService";
import { UserService } from "./../services/UserService";
import { MailService } from "./../services/MailService";
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
    private mailService: MailService,
  ) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.mailService = mailService;
  }

  /**
   * register a new user
   * @param req
   * @param res
   * @returns a success message conveying that the user was registered
   */
  public async register(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { first_name, last_name, email, password, profilePicture } = req.body;
    const pic = !profilePicture ? "NA" : profilePicture;
    if (!first_name || !last_name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Missing required fields.");
    }
    try {
      const message = await this.userService.registerUser(
        first_name,
        last_name,
        email,
        password,
        pic,
      );
      const userId = await this.userService.loginUser(email, password);
      const ip = req.ip || req.clientIp;
      await this.sessionService.createSession(req.session, userId, ip);
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
      const ip = req.ip || req.clientIp;
      const userId = await this.userService.loginUser(email, password);
      await this.sessionService.createSession(req.session, userId, ip);
      return res.status(StatusCodes.OK).send(`Login successful `);
    } catch (error) {
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
   * endpoint for submitting reports against user profiles
   * @param req
   * @param res
   */
  public async reportUserProfile(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const reportedUserId = req.params.userId;
      const parsedReportedUserId = parseInt(reportedUserId);
      if (isNaN(parsedReportedUserId)) {
        res.status(StatusCodes.BAD_REQUEST).send("bad request params");
      }
      const reportsAgainstUser = await this.userService.submitReport(
        userId,
        parsedReportedUserId,
      );
      res
        .status(StatusCodes.ACCEPTED)
        .send("report submit successful : " + reportsAgainstUser);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error submitting report : " + error);
    }
  }

  /**
   * handles getting user profiles by page
   */
  public async getUserProfiles(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const page = req.query.page as string;
      const introvert = req.query.isIntrovert as string;
      const parsedPage = parseInt(page);
      if (isNaN(parsedPage) || parsedPage < 1) {
        res.status(StatusCodes.BAD_REQUEST).send("Bad page number");
      }
      const introvertList = introvert
        ? introvert.toLowerCase() === "true"
        : undefined;

      const userProfiles = await this.userService.getUserProfilesPage(
        userId,
        parsedPage,
        introvertList,
      );
      res.status(StatusCodes.OK).send(userProfiles);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
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
      console.error("Error deleting session from DB:");
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error during logout");
    }
  }

  /**
   * end point to verify that a password reset token is valid
   * @param req
   * @param res
   * @returns
   */
  public async verifyToken(req: Request, res: Response) {
    try {
      const { userId, token } = req.body;
      if (!token || !userId) {
        res.status(StatusCodes.BAD_REQUEST).send();
      }
      const parsedId = parseInt(userId);
      const result = await this.userService.verifyToken(parsedId, token);
      res.status(StatusCodes.ACCEPTED).send(result);
    } catch (error) {
      if (error.message) {
        switch (error.message) {
          case "401":
            return res.status(StatusCodes.NOT_FOUND).send("Invalid Token");
          case "404":
            return res
              .status(StatusCodes.NOT_FOUND)
              .send("User Not Found" + error);
          default:
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .send("Unknown error");
        }
      }
    }
  }

  /**
   * handles pasword recovery by generating a token and url
   * for a user by email, then sends the url via email
   * @param req
   * @param res
   * @returns
   */
  public async recoverPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(StatusCodes.BAD_REQUEST).send();
      }
      const recoverPasswordLink = await this.userService.recoverPassword(email);
      this.mailService.sendRecoveryEmail(email, recoverPasswordLink);
      res.status(StatusCodes.OK).send("Recovery email sent");
    } catch (error) {
      if (error.message) {
        switch (error.message) {
          case "400":
            return res.status(StatusCodes.BAD_REQUEST).send("Malformed Email");
          case "401":
            return res.status(StatusCodes.NOT_FOUND).send("Invalid Token");
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
   * end point to handle password resets
   * @param req
   * @param res
   * @returns
   */
  public async resetPassword(req: Request, res: Response) {
    try {
      const { userId, token, newPassword } = req.body;
      if (!userId || !token || !newPassword) {
        res.status(StatusCodes.BAD_REQUEST).send("Missing params");
      }
      const parsedId = parseInt(userId);
      if (isNaN(parsedId)) {
        res.status(StatusCodes.BAD_REQUEST).send();
      }
      await this.userService.resetPassword(userId, token, newPassword);
      res.status(StatusCodes.OK).send("Success");
    } catch (error) {
      if (error.message) {
        switch (error.message) {
          case "400":
            return res.status(StatusCodes.NOT_FOUND).send("Invalid password");
          case "401":
            return res.status(StatusCodes.NOT_FOUND).send("Invalid Token");
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
}
