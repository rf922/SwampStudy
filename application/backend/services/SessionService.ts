import { Request } from "express";
import { UserRepository } from "./../repositories/UserRepository";
import { SessionRepository } from "./../repositories/SessionRepository";
import { SessionData } from "express-session";

/**
 * SessionService to abstract user session management.
 * includes checking if a user session is active,
 * creating new sessions upon user login,
 * and destroying sessions upon logout. more to come...
 */
export class SessionService {
  /**
   * sessionService uses userRepo to create sess for users, and
   * sessionRepo to perform session related db ops
   * @param userRepository
   * @param sessionRepository
   */
  constructor(
    private userRepository: typeof UserRepository,
    private sessionRepository: typeof SessionRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  /**
   * performs logic to establish sessions validity
   * @param session
   * @returns
   */
  public async checkSession(session: SessionData) {
    if (!session) {
      //check for existance
      return { isLoggedIn: false };
    }
    if (session.userId) {
      //curr we relly on presence of a userId
      // sess exists amd userId set, user is considered authenticated for now
      // may add check to ensure ID corresponds to valid user

      return { isLoggedIn: true, userId: session.userId };
    } else {
      return { isLoggedIn: false };
    }
  }

  /**
   * create a session for a given user
   * @param session
   * @param email
   */
  public async createSession(session: SessionData, email: string) {
    const user = await this.userRepository.getUserByEmail(email);

    /**
     * curr sesssion set up entails setting the user.id
     * may expand later to handle, device, ip, createdAt etc..
     */
    session.userId = user.id;
  }

  /**
   * logic used to handl the destruction of a user session
   * @param req
   * @returns
   */
  public async destroySession(req: Request) {
    if (!req.session) {
      throw new Error("Session not found.");
    }
    const sessId = req.session.id;

    return new Promise<void>((resolve, reject) => {
      // wrapping the destroy in a promise to fix session / partial session error
      req.session.destroy(async (err) => {
        // clears sess from server side

        if (err) {
          // error rejects promise i.e failed
          console.error("Error during session destruction:", err);
          reject("Session destruction failed.");
        } else {
          try {
            await this.sessionRepository.hardDelete(sessId);
            // succ, resolve
            resolve();
          } catch (error) {
            console.error("Error deleting session from database:", error);
            reject("Failed to delete session record from database.");
          }
        }
      });
    });
  }
}
