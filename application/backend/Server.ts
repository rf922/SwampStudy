import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import { TypeormStore } from "connect-typeorm";
import { myDataSource } from "./app-data-source";
import accountRouter from "./routers/accountRouter";
import userRouter from "./routers/userRouter";
import likeRouter from "./routers/likeRouter";
import matchRouter from "./routers/matchRouter";
import forumRouter from "./routers/forumRouter";
import ratingRouter from "./routers/ratingRouter";

import authenticationRouter from "./routers/authenticationRouter";
import { Session } from "./entities/session.entity";

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.initializeDataSource();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private async initializeDataSource(): Promise<void> {
    try {
      await myDataSource.initialize();
      console.log("Successful DB Connection");
    } catch (err) {
      console.error("Database connection failed", err);
    }
  }

  private configureMiddleware(): void {
    const corsOptions = {
      origin: "https://https://swamp-study.global.ssl.fastly.net",
      credentials: true,
    };

    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.resolve("./") + "/dist"));

    // Configure session with TypeORM store
    const sessionRepository = myDataSource.getRepository(Session);
    this.app.use(
      session({
        secret: "session_cookie_secret",
        store: new TypeormStore().connect(sessionRepository),
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.PRODUCTION === "true",
          sameSite: "strict",
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        },
      }),
    );
  }

  private configureRoutes(): void {
    this.app.use("/api/auth", authenticationRouter);
    this.app.use("/api/account", accountRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/like", likeRouter);
    this.app.use("/api/match", matchRouter);
    this.app.use("/api/forum", forumRouter);
    this.app.use("/api/rating", ratingRouter);
    this.app.get("/api", (req: Request, res: Response) =>
      res.send("You have reached the API!"),
    );
    this.app.get("*", (req: Request, res: Response) =>
      res.sendFile(path.resolve("./") + "/dist/index.html"),
    );
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  }
}
