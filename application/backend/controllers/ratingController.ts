import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RatingService } from "./../services/RatingService";

/**
 * the rating controller, use services from within here
 */
export class RatingController {
  /**
   * dependencies i.e other services go here
   * @param ratingService
   */
  constructor(private ratingService: RatingService) {
    this.ratingService = ratingService;
  }

  public async pingController(req: Request, res: Response) {
    try {
      const { msg } = req.params;
      res.send(`$ echo ${msg} `);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      console.log(error);
      res.send("failed to ping the rating contrl");
    }
  }

  /**
   * end point for posting a rating to an user corresponding
   * to the passed userId
   * @param req
   * @param res
   * @returns the created rating entry
   */
  public async postRating(req: Request, res: Response) {
    try {
      const { rating, userId } = req.body;
      const parsedRating = parseInt(rating);
      const parsedUserId = parseInt(userId);

      if (isNaN(parsedUserId) || isNaN(parsedRating)) {
        //param check bad type
        return res.status(StatusCodes.BAD_REQUEST).send("bad req");
      } else if (parsedUserId < 1 || parsedRating < 0) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid range");
      }
      const results = await this.ratingService.submitRating(
        parsedRating,
        parsedUserId,
      );
      res.status(StatusCodes.ACCEPTED).send(results);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("err");
    }
  }

  /**
   * function for returning user rating by userId
   * @param req
   * @param res
   * @returns
   */
  public async getRating(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const parsedUserId = parseInt(userId);

      if (isNaN(parsedUserId) && !(parsedUserId < 1)) {
        // param chaeck
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid Account ID" });
      }
      const avgRating = await this.ratingService.getRating(parsedUserId);
      if (avgRating === undefined) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: "No rating found" });
      }
      return res.status(StatusCodes.OK).json({ avgRating });
    } catch (error) {
      if (error.message === "404") {
        res.status(StatusCodes.NOT_FOUND).send("Account not found.");
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
