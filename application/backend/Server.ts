import bodyParser from "body-parser";
import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import cors from "cors";
import userRouter from "./routes/userRouter";import { myDataSource } from "./app-data-source";

const account = require("./routers/account_router");
const user = require("./routers/user_router");

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
    this.app.use(cors());
    this.app.use(express.static(path.resolve("./") + "/dist"));
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use("/api/account", account);
    this.app.use("/api/user", user);

    this.app.get("/api", (req: Request, res: Response): void => {
      res.send("You have reached the API!");
    });

    // user routing , userRouter -> userController
    this.app.use("/user", userRouter);

    //        this.app.get("*", (req: Request, res: Response): void => {
    //            res.sendFile(path.resolve("./") + "/dist/index.html");
    //        });
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  }
}
