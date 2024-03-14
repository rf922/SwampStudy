import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import { myDataSource } from "./app-data-source";

// es6 syntax, router names match file names
import accountRouter from "./routers/accountRouter.js";
import userRouter from "./routers/userRouter.js";
import forumRouter from "./routers/forumRouter.js";

myDataSource
  .initialize()
  .then(() => {
    console.log("Successfull DB Conn");
  })
  .catch((err) => {
    console.log("not Successful", err);
  });

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this.app.use(express.json());
    this.app.use(express.static(path.resolve("./") + "/dist"));

    this.app.use("/api/account", accountRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/forum", forumRouter);
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
