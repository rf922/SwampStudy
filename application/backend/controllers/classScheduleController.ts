import { StatusCodes } from "http-status-codes";
import { ClassScheduleService } from "./../services/ClassScheduleService";
import { Request, Response } from "express";

/**
 * The class scheduel controller manages receiving and handling requests relating
 * to user / class scheduel
 */
export class ClassScheduleController {
  /**
   * the class scheduel controller primarily depends on the class scheduel service
   * to handle the user scheduel operations
   * @param classScheduelService
   */
  constructor(private classScheduleService: ClassScheduleService) {
    this.classScheduleService = classScheduleService;
  }

  /**
   * init ping for dev.
   */
  public async ping(req: Request, res: Response) {
    try {
      const { msg } = req.body;
      res.status(StatusCodes.ACCEPTED).send(`echo ${msg}`);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async getClassSchedule(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const courseSchedule =
        await this.classScheduleService.getUserClassesById(userId);
      return res.status(StatusCodes.ACCEPTED).send(courseSchedule);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND);
    }
  }

  /**
   * adds a class to a users scheduel
   * @param req
   * @param res
   */
  public async updateUserClassSchedule(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const { classes } = req.body;
      const result = await this.classScheduleService.updateUserClasses(
        userId,
        classes,
      );
      return res.status(StatusCodes.ACCEPTED).send(result);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Problemupdating class schedule");
    }
  }
}
