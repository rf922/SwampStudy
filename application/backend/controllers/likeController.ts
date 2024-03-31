import { Request, Response } from "express";
import { myDataSource } from "./../app-data-source";
import { Like } from "./../entities/like.entity";
import { validate } from "class-validator";
import { Match } from "./../entities/match.entity";
import { Class } from "./../entities/class.entity";
import { Account } from "./../entities/account.entity";
import { LikeService } from "./../services/LikeService";
import { AccountService } from "./../services/AccountService";
import { ClassService } from "./../services/ClassService";

export class LikeController {
  constructor(
    private likeService: LikeService,
    private accountService: AccountService,
    private classService: ClassService,
  ) {
    this.likeService = likeService;
    this.accountService = accountService; // may needd this
    this.classService = classService;
  }

  public async postLike(req: Request, res: Response) {
    const like = await myDataSource.getRepository(Like).create(req.body);
    const errors = await validate(like);

    if (errors.length > 0) {
      res.status(422);
      res.send("Failed Data Validation");
    } else {
      try {
        const results = await myDataSource.getRepository(Like).insert(like);
        //const likerID = req.body.liker;
        const likerObject = await myDataSource
          .getRepository(Account)
          .createQueryBuilder("account")
          .where("id = :id", { id: req.body.liker })
          .getOne();
        const likedObject = await myDataSource
          .getRepository(Account)
          .createQueryBuilder("account")
          .where("id = :id", { id: req.body.liked })
          .getOne();
        //Need to check whether there is a counter like somewhere
        const potential_match = await myDataSource
          .createQueryBuilder()
          .select("like")
          .from(Like, "like")
          .where("likerId = :likerID AND likedId = :likedID", {
            likerID: req.body.liked,
            likedID: req.body.liker,
          })
          .getOne();
        if (potential_match) {
          console.log(potential_match);
          console.log("Match");
          const newMatch = new Match();
          newMatch.meetingLink = "Hi";
          newMatch.meetingTime = "10-20-2001";
          newMatch.users = [likedObject, likerObject];
          newMatch.class = 1 as unknown as Class;
          await myDataSource.manager.save(newMatch);
        }
        res.send(results);
      } catch (error) {
        res.status(422);
        console.log(error);
        res.send("Duplicate Request or DB Error");
      }
    }
  }
}
