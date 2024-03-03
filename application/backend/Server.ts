import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this.app.use(express.static(path.resolve("./") + "/dist"));

    this.app.get("/api", (req: Request, res: Response): void => {
      res.send("You have reached the API!");
    });

    // this.app.get("/about", (req: Request, res: Response): void => {
    //     res.sendFile(path.resolve("./") + "/dist/about.html");
    // });

    this.app.get("*", (req: Request, res: Response): void => {
      res.sendFile(path.resolve("./") + "/dist/index.html");
    });
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  }
}
