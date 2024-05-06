import { Request, Response } from "express";
import { MatchService } from "./../services/MatchService";
import { StatusCodes } from "http-status-codes";

export class MatchController {
  constructor(private matchService: MatchService) {
    this.matchService = matchService;
  }

  /**
   * endpoint to get a users matches
   * @param req
   * @param res
   */
  public async getMatches(req: Request, res: Response) {
    try {
      const id = req.session.userId;
      const matches = await this.matchService.getMatches(id);
      res.status(StatusCodes.OK).send(matches);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error.message);
    }
  }

  /**
   * end point for updating a matches meeting date , pos be expanded later to update
   * more match related dat
   * @param req
   * @param res
   * @returns
   */
  public async updateMatchDate(req: Request, res: Response) {
    try {
      const { matchId, meetingDate } = req.body;
      if (!matchId || !meetingDate) {
        //param check
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Missing required fields" })
          .send();
      }

      const updatedMatch = await this.matchService.updateMatchDate(
        matchId,
        meetingDate,
      );
      if (updatedMatch) {
        res.status(StatusCodes.ACCEPTED).json(updatedMatch).send();
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Match not found" })
          .send();
      }
    } catch (error) {
      console.error("Failed to update match date:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }

  /**
   * end point to get a specific match by userId1 and userId2
   * @param req
   * @param res
   * @returns
   */
  public async getMatch(req: Request, res: Response) {
    try {
      const { userId1, userId2 } = req.query;
      if (!userId1 || !userId2) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("User IDs are required.");
      }

      const parsedUserId1 = parseInt(userId1 as string);
      const parsedUserId2 = parseInt(userId2 as string);

      if (isNaN(parsedUserId1) || isNaN(parsedUserId2)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("User IDs must be valid integers.");
      }

      const match = await this.matchService.getMatch(
        parsedUserId1,
        parsedUserId2,
      );
      if (!match) {
        return res.status(StatusCodes.NOT_FOUND).send("Match not found. ");
      }

      return res.status(StatusCodes.OK).send(match);
    } catch (error) {
      console.error("Error getting match:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error getting match: " + error.message);
    }
  }
}
