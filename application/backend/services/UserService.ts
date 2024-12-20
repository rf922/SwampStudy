import { User } from "./../entities/user.entity";
import { UserRepository } from "./../repositories/UserRepository";
import { hash, compare } from "bcryptjs";
import { Rating } from "./../entities/rating.entity";
import { countSetBits } from "./../utils/availabilityUtils";
import { generateResetToken } from "./../utils/token";
import { validateFields } from "./../utils/validationUtils";
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
    return await this.userRepository.getUserByEmail(email);
  }

  /**
   * gets a user by Id
   * @param id
   * @returns user
   */
  public async getUserById(id: number) {
    return await this.userRepository.getUserById(id);
  }

  public async submitReport(_reportingUserId: number, reportedUserId: number) {
    const reports = await this.userRepository.reportUser(reportedUserId);
    return reports;
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
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("404");
    }
    //bcrypt compare compares the plaintext password against the hashed password in the db
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("401");
    }
    return user.id;
  }

  /**
   * method to handle password recovery for user whose account
   * is associated with the given email, generates a reset token for the user, stores it
   * then forms the reset link for the user
   * @param email
   * @returns
   */
  public async recoverPassword(email: string) {
    if (!validateFields({ email: email })) {
      throw new Error("400");
    }
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("404");
    }

    const resetToken = generateResetToken();
    const hashedToken = await hash(resetToken, 10);
    await this.userRepository.setResetPasswordToken(user.id, hashedToken);
    return this.getResetLink(user.id, resetToken);
  }

  /**
   * paasswd reset
   */
  public async resetPassword(
    userId: number,
    token: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error("404");
    }
    await this.verifyToken(user.id, token);

    if (validateFields({ newPassword })) {
      const hashedPassword = await hash(newPassword, 10);
      await this.userRepository.resetPassword(user.id, hashedPassword);
    } else {
      throw new Error("400");
    }
  }

  /**
   * handles token verification by checking if it is expired and if it
   * matches what it stored in the db
   * @param userId
   * @param token
   * @returns
   */
  public async verifyToken(userId: number, token: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error("404");
    }
    const now = new Date();
    if (user.resetPasswordExpires < now) {
      throw new Error("401");
    }
    const isTokenMatch = await compare(token, user.resetPasswordToken);
    if (isTokenMatch) {
      return true;
    } else {
      throw new Error("401");
    }
  }

  /**
   * function to get a page of user profiles
   * @param page
   * @returns
   */
  public async getUserProfilesPage(
    userId: number,
    page: number,
    introvertList?: boolean,
  ) {
    let userPage;
    if (introvertList) {
      userPage = await this.userRepository.getIntrovertPage(userId, page);
    } else {
      userPage = await this.userRepository.getUserPage(userId, page);
    }
    const currentUser = await this.userRepository.getUserById(userId);
    userPage.sort((userX, userY) => {
      const overlapX = this.getAvailabilityOverlap(
        currentUser.account.weekavailability,
        userX.account.weekavailability,
      );
      const overlapY = this.getAvailabilityOverlap(
        currentUser.account.weekavailability,
        userY.account.weekavailability,
      );
      return overlapY - overlapX;
    });
    return this.formatUserProfiles(userPage);
  }

  private getAvailabilityOverlap(
    user1Availability: number,
    user2Availability: number,
  ): number {
    const overlap = user1Availability & user2Availability;
    return countSetBits(overlap);
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

  /**
   * private helper to form the reset link
   * @param userId
   * @param token
   * @returns
   */
  private getResetLink(userId: string, token: string) {
    const resetLink = `${process.env.ORIGIN}/reset-password?userId=${userId}&token=${token}`;
    return resetLink;
  }
}
