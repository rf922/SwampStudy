import { DIContainer } from "./DIContainer";

import { UserService } from "../services/UserService";
import { UserController } from "../controllers/userController";
import { SessionService } from "../services/SessionService";
import { UserRepository } from "../repositories/UserRepository";
import { AccountRepository } from "../repositories/AccountRepository";
import { AuthenticationController } from "../controllers/authenticationController";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { ThreadRepository } from "../repositories/ThreadRepository";
import { AccountController } from "../controllers/accountController";
import { AccountService } from "../services/AccountService";
import { ClassService } from "../services/ClassService";
import { QuestionService } from "../services/QuestionService";
import { ThreadService } from "../services/ThreadService";
import { ForumController } from "../controllers/ForumController";
import { ClassRepository } from "../repositories/ClassRepository";
import { SessionRepository } from "../repositories/SessionRepository";
import { LikeRepository } from "../repositories/LikeRepository";
import { LikeService } from "../services/LikeService";
import { MatchRepository } from "../repositories/MatchRepository";
import { MatchService } from "../services/MatchService";
import { MatchController } from "../controllers/matchController";

/**
 * // this is sets up the dep injection by registering  repositories,
 * services, and controllers—with the DI container.
 */
export const DIContainerConfig = (diContainer: typeof DIContainer) => {
  /* register repos here as instances */
  diContainer.registerInstance("UserRepository", UserRepository);
  diContainer.registerInstance("AccountRepository", AccountRepository);
  diContainer.registerInstance("ThreadRepository", ThreadRepository);
  diContainer.registerInstance("QuestionRepository", QuestionRepository);
  diContainer.registerInstance("ClassRepository", ClassRepository);
  diContainer.registerInstance("SessionRepository", SessionRepository);
  diContainer.registerInstance("LikeRepository", LikeRepository);
  diContainer.registerInstance("MatchRepository", MatchRepository);

  /* add other repositories as needed... */

  /* register services to factory here, inject dependencies */
  diContainer.registerFactory(
    "UserService",
    () => new UserService(diContainer.resolve("UserRepository")),
  );
  diContainer.registerFactory(
    "SessionService",
    () =>
      new SessionService(
        diContainer.resolve("UserRepository"),
        diContainer.resolve("SessionRepository"),
      ),
  );
  diContainer.registerFactory(
    "AccountService",
    () =>
      new AccountService(
        diContainer.resolve("AccountRepository"),
        diContainer.resolve("UserRepository"),
      ),
  );
  diContainer.registerFactory(
    "ClassService",
    () => new ClassService(diContainer.resolve("ClassRepository")),
  );
  diContainer.registerFactory(
    "QuestionService",
    () => new QuestionService(diContainer.resolve("QuestionRepository")),
  );
  diContainer.registerFactory(
    "ThreadService",
    () => new ThreadService(diContainer.resolve("ThreadRepository")),
  );
  diContainer.registerFactory(
    "LikeService",
    () => new LikeService(diContainer.resolve("LikeRepository")),
  );

  diContainer.registerFactory(
    "MatchService",
    () => new MatchService(diContainer.resolve("MatchRepository")),
  );
  /* expand services as needed */

  /* register controllers here passing factory methods to get instances */
  diContainer.registerFactory(
    "UserController",
    () =>
      new UserController(
        diContainer.resolve("UserService"),
        diContainer.resolve("SessionService"),
      ),
  );
  diContainer.registerFactory(
    "AccountController",
    () =>
      new AccountController(
        diContainer.resolve("AccountService"),
        diContainer.resolve("SessionService"),
      ),
  );
  diContainer.registerFactory(
    "AuthenticationController",
    () => new AuthenticationController(diContainer.resolve("SessionService")),
  );
  diContainer.registerFactory(
    "ForumController",
    () =>
      new ForumController(
        diContainer.resolve("QuestionService"),
        diContainer.resolve("ThreadService"),
        diContainer.resolve("ClassService"),
      ),
  );
  diContainer.registerFactory(
    "LikeController",
    () =>
      new ForumController(
        diContainer.resolve("LikeService"),
        diContainer.resolve("AccountService"),
        diContainer.resolve("ClassService"),
      ),
  );
  diContainer.registerFactory(
    "MatchController",
    () =>
      new MatchController(
        diContainer.resolve("MatchService"),
        //diContainer.resolve("LikeService") /* might need to add more here ad matches and like are dev */
      ),
  );
  /* add as project expands */
};
