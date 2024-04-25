import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FileService } from "./../services/FileService";

/**
 * file controlller handles file related ops
 */
export class FileController {
  private fileService: FileService;

  constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  public async getSignedAndPublicUrl(req: Request, res: Response) {
    try {
      const { filename, path } = req.query;
      if (!filename || !path) {
        throw new Error("Invalid params passed");
      }
      const urls = await this.fileService.generateUrl(filename, path);
      res.status(StatusCodes.OK).send({ urls });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send("Url could not be signed : " + error.message);
    }
  }
}
