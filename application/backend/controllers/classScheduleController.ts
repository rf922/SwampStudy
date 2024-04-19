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
    } catch (error) {}
  }

  /**
   * adds a class to a users scheduel
   * @param req
   * @param res
   */
  public async addClass(req: Request, res: Response) {}

  /**
   * going to add more, probably have frontend send
   * backend an array of class ids ?
   */
}
