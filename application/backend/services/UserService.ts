import { User } from "./../entities/user.entity";
import { UserRepository } from "./../repositories/UserRepository";
import { hash, compare } from "bcryptjs";
import { Rating } from "./../entities/rating.entity";

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

  /**
   * function to get a page of user profiles
   * @param page
   * @returns
   */
  public async getUserProfilesPage(userId: number, page: number) {
    const userPage = await this.userRepository.getUserPage(userId, page);
    return this.formatUserProfiles(userPage);
  }

  /**
   * private helper to format userprofile objects
   * @param users
   * @returns
   */
  private formatUserProfiles(users: User[]) {
    return users.map((user) => ({
      id: user.account.id,
      first_name: user.account.first_name,
      last_name: user.account.last_name,
      email: user.email,
      profile_picture: user.account.profile_picture,
      weekavailability: user.account.weekavailability,
      educator: user.account.educator,
      introvert: user.account.introvert,
      isHidden: user.account.isHidden,
      biography: user.account.biography,
      rating: this.getAverageRating(user.account.ratings),
      courses: user.account.classSchedule.map((schedule) => ({
        id: schedule.class.id,
        name: schedule.class.name,
        number: schedule.class.number,
        department: schedule.class.department,
      })),
    }));
  }

  /**
   * private helper getcs the users average rating
   * @param ratings
   * @returns
   */
  private getAverageRating(ratings: Rating[]) {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return 0; //defaul 0
    }
    const total = ratings.reduce((acc, { rating }) => acc + rating, 0);
    const average = total / ratings.length;
    return average;
  }
}
