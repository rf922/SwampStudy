import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { validate } from "class-validator";
import { Rating } from "../entities/rating.entity";
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

  public async postRating(req: Request, res: Response) {
    const rating = await myDataSource.getRepository(Rating).create(req.body);
    const errors = await validate(rating);
    if (errors.length > 0) {
      res.status(422);
      res.send("Failed Data Validation");
    } else {
      try {
        const results = await myDataSource.getRepository(Rating).insert(rating);
        res.send(results);
      } catch (error) {
        res.status(422);
        console.log(error);
        res.send("Duplicate request or DB Error");
      }
    }
  }

  public async getRating(req: Request, res: Response) {
    try {
      const id = req.body.userID;
      console.log(typeof id);
      //if (isNaN(id)) {
      //  return res
      //    .status(StatusCodes.BAD_REQUEST)
      //    .json({ message: "Invalid Account ID" });
      //}
      const avgRating = await myDataSource
        .getRepository(Rating)
        .createQueryBuilder("rating")
        .where("rating.account = :account", { account: id })
        .select("AVG(rating)", "avg")
        .getRawOne();
      return res.status(StatusCodes.OK).json({ rating: avgRating });
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Error Getting AVG Rating" });
    }
  }
}
