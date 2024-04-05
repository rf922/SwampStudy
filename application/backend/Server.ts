import express, { Express, Request, Response } from "express";
import "dotenv/config";
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
import { DIContainer } from "./config/DIContainer";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/userController";
import { SessionService } from "./services/SessionService";
import authenticationRouter from "./routers/authenticationRouter";
import { Session } from "./entities/session.entity";
import { UserRepository } from "./repositories/UserRepository";
import { AccountRepository } from "./repositories/AccountRepository";
import { AuthenticationController } from "./controllers/authenticationController";
import { QuestionRepository } from "./repositories/QuestionRepository";
import { ThreadRepository } from "./repositories/ThreadRepository";
import { AccountController } from "./controllers/accountController";
import { AccountService } from "./services/AccountService";
import { ClassService } from "./services/ClassService";
import { QuestionService } from "./services/QuestionService";
import { ThreadService } from "./services/ThreadService";
import { ForumController } from "./controllers/ForumController";
import { ClassRepository } from "./repositories/ClassRepository";
import { SessionRepository } from "./repositories/SessionRepository";
import { LikeRepository } from "./repositories/LikeRepository";
import { LikeService } from "./services/LikeService";
import { MatchRepository } from "./repositories/MatchRepository";
import { MatchService } from "./services/MatchService";
import { MatchController } from "./controllers/matchController";

import ratingRouter from "./routers/ratingRouter";

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.initializeDataSource();
    this.configureDIContainer();
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

  /**
   * // this is sets up the dep injection by registering  repositories,
   * services, and controllers—with the DI container.
   */
  private configureDIContainer(): void {
    /* register repos here as instances */
    DIContainer.registerInstance("UserRepository", UserRepository);
    DIContainer.registerInstance("AccountRepository", AccountRepository);
    DIContainer.registerInstance("ThreadRepository", ThreadRepository);
    DIContainer.registerInstance("QuestionRepository", QuestionRepository);
    DIContainer.registerInstance("ClassRepository", ClassRepository);
    DIContainer.registerInstance("SessionRepository", SessionRepository);
    DIContainer.registerInstance("LikeRepository", LikeRepository);
    DIContainer.registerInstance("MatchRepository", MatchRepository);

    /* add other repositories as needed... */

    /* register services to factory here, inject dependencies */
    DIContainer.registerFactory(
      "UserService",
      () => new UserService(DIContainer.resolve("UserRepository")),
    );
    DIContainer.registerFactory(
      "SessionService",
      () =>
        new SessionService(
          DIContainer.resolve("UserRepository"),
          DIContainer.resolve("SessionRepository"),
        ),
    );
    DIContainer.registerFactory(
      "AccountService",
      () =>
        new AccountService(
          DIContainer.resolve("AccountRepository"),
          DIContainer.resolve("UserRepository"),
        ),
    );
    DIContainer.registerFactory(
      "ClassService",
      () => new ClassService(DIContainer.resolve("ClassRepository")),
    );
    DIContainer.registerFactory(
      "QuestionService",
      () => new QuestionService(DIContainer.resolve("QuestionRepository")),
    );
    DIContainer.registerFactory(
      "ThreadService",
      () => new ThreadService(DIContainer.resolve("ThreadRepository")),
    );
    DIContainer.registerFactory(
      "LikeService",
      () => new LikeService(DIContainer.resolve("LikeRepository")),
    );

    DIContainer.registerFactory(
      "MatchService",
      () => new MatchService(DIContainer.resolve("MatchRepository")),
    );
    /* expand services as needed */

    /* register controllers here passing factory methods to get instances */
    DIContainer.registerFactory(
      "UserController",
      () =>
        new UserController(
          DIContainer.resolve("UserService"),
          DIContainer.resolve("SessionService"),
        ),
    );
    DIContainer.registerFactory(
      "AccountController",
      () =>
        new AccountController(
          DIContainer.resolve("AccountService"),
          DIContainer.resolve("SessionService"),
        ),
    );
    DIContainer.registerFactory(
      "AuthenticationController",
      () => new AuthenticationController(DIContainer.resolve("SessionService")),
    );
    DIContainer.registerFactory(
      "ForumController",
      () =>
        new ForumController(
          DIContainer.resolve("QuestionService"),
          DIContainer.resolve("ThreadService"),
          DIContainer.resolve("ClassService"),
        ),
    );
    DIContainer.registerFactory(
      "LikeController",
      () =>
        new ForumController(
          DIContainer.resolve("LikeService"),
          DIContainer.resolve("AccountService"),
          DIContainer.resolve("ClassService"),
        ),
    );
    DIContainer.registerFactory(
      "MatchController",
      () =>
        new MatchController(
          DIContainer.resolve("MatchService"),
          //DIContainer.resolve("LikeService") /* might need to add more here ad matches and like are dev */
        ),
    );
    /* add as project expands */
  }

  private configureMiddleware(): void {
    const corsOptions = {
      //change to url when in production
      origin: "http://localhost:3000",
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
        secret: process.env.SESSION_SECRET,
        store: new TypeormStore().connect(sessionRepository),
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.PRODUCTION === "true",
          sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // millisec * sec * min * hour * day , 7 day exp
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
    port = parseInt(process.env.PORT) || 80;
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  }
}
