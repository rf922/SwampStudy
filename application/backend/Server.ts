import { Express, Request, Response } from "express";
import express from "express";
import * as path from "path";
import cors from "cors";
import { myDataSource } from "./app-data-source";
import bodyParser from "body-parser";
import accountRouter from "./routers/accountRouter";
import userRouter from "./routers/userRouter";
import likeRouter from "./routers/likeRouter";
import matchRouter from "./routers/matchRouter";
import session from "express-session";

const sessionStoreOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MyNewPass",
  database: "sessions_db",
};

const MySQLStore = require("express-mysql-session")(session);
const store = new MySQLStore(sessionStoreOptions);

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
    const corsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.resolve("./") + "/dist"));

    this.app.use(
      session({
        secret: "session_cookie_secret",
        store: store,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.PRODUCTION === "true",
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        },
      }),
    );

    this.app.use("/api/account", accountRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/like", likeRouter);
    this.app.use("/api/match", matchRouter);
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
