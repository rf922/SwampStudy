import { UserRepository } from "./../repositories/UserRepository";
import { hash, compare } from "bcrypt";

/**
 * user service class responsible for handlig business logic rel.
 * to user, uses user repo to handle the db ops
 */
export class UserService {
  /**
   * depends on user Repo handle user db operations
   * @param userRepository
   */
  constructor(private userRepository: typeof UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * get a user by user email
   * @param email
   * @returns the user corr to email
   */
  public async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  /**
   * gets a user by Id
   * @param id
   * @returns user
   */
  public async getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  /**
   * registers a new user
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @returns
   */
  public async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profilePicture?: string,
  ): Promise<string> {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      //check that the user does not curr exist
      throw new Error("409");
    }
    //use b cryot with 10 salt rounds to hash the plain text pass, then store the hashed pass in the db
    const hashedPassword = await hash(password, 10);
    try {
      await this.userRepository.createUserWithAccount(
        firstName,
        lastName,
        email,
        hashedPassword,
        profilePicture,
      );
      return `User and account registered with email: ${email}`;
    } catch (error) {
      throw new Error(
        error.message || "An error occurred during registration.",
      );
    }
  }

  /**
   * handles updates to user ent specific fields like email and password
   * @param id
   * @param email
   * @param password
   * @returns
   */
  public async updateUserEmailAndPassword(
    id: number,
    email: string,
    password: string,
  ) {
    return await this.userRepository.updateUserEmailAndPassword(
      id,
      email,
      password,
    );
  }

  /**
   * handles the login of a user by ensuring the users existance and
   * validating the password passed matches whats saved in the db
   * @param email
   * @param password
   * @returns the userId of the logged in user
   */
  public async loginUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("404");
    }
    //bcrypt compare compares the plaintext password against the hashed password in the db
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("401");
    }
    return user.userId;
  }
}
