import { Request, Response } from "express";
import { LikeService } from "./../services/LikeService";
import { AccountService } from "./../services/AccountService";
import { ClassService } from "./../services/ClassService";
import { StatusCodes } from "http-status-codes";
import { MatchService } from "./../services/MatchService";

export class LikeController {
  constructor(
    private likeService: LikeService,
    private accountService: AccountService,
    private classService: ClassService,
    private matchService: MatchService,
  ) {
    this.likeService = likeService;
    this.accountService = accountService; // may needd this
    this.classService = classService;
    this.matchService = matchService;
  }

  /**
   * end point to create a like entry where the current user
   * likes the user corresponding to userId2
   * @param req
   * @param res
   * @returns
   */
  public async createLike(req: Request, res: Response) {
    try {
      const userId1 = req.session.userId;
      const { userId2 } = req.body;
      if (isNaN(userId2)) {
        res.status(StatusCodes.BAD_REQUEST).send("invalid params");
      }
      const results = await this.likeService.createLike(userId1, userId2);
      const requited = await this.likeService.getLike(userId2, userId1);
      if (requited) {
        const match = await this.matchService.createMatch(userId1, userId2);
        const data = { match: match, created: true };
        return res.status(StatusCodes.OK).send(data);
      }

      return res.status(StatusCodes.CREATED).send(results);
    } catch (error) {
      res.status(422).send("Duplicate Request or DB Error" + error.message);
    }
  }
}
