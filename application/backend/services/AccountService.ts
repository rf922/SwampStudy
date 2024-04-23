import { AccountRepository } from "./../repositories/AccountRepository";
import { hash } from "bcrypt";
import { UserRepository } from "./../repositories/UserRepository";

/**
 * this class encapsulates acc related business logic,
 * it interfaces between the controller and the data access layer i.e our repositories
 */
export class AccountService {
  /**
   * instantiate account service with its repository dependencies,
   * @param accountRepository //acc repo
   * @param userRepository  // usr repo
   */
  constructor(
    private accountRepository: typeof AccountRepository,
    private userRepository: typeof UserRepository,
  ) {
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
  }

  /**
   *
   * @param id gets an account by Id
   * @returns
   */
  public async getAccount(id: number) {
    const account = await this.accountRepository.getAccountById(id);
    if (!account) {
      throw new Error("Account not found");
    }
    return account;
  }

  /**
   * delete account by Id, also deletes related data
   * @param userId
   * @returns
   */
  public async deleteAccount(userId: number): Promise<string> {
    if (!userId) {
      throw new Error("User not logged in.");
    }

    try {
      const message = await this.accountRepository.deleteAccount(userId);
      return message;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw new Error("Error deleting account. : " + error.message);
    }
  }

  /**
   * retrieves account details by id
   * @param id
   * @returns
   */
  public async getAccountDetails(id: number) {
    const account = await this.accountRepository.getAccountDetails(id);
    if (!account) {
      throw new Error("Account not found");
    }
    return account;
  }

  /**
   * handles account specific detail updates i.e id, firstname, lastname .. pos profile pic in future
   * @param id //acc id
   * @param firstName //firstName to be changed to
   * @param lastName //lastName to be changed to
   */
  public async updateAccountDetails(
    id: number,
    firstName: string,
    lastName: string,
    profilePicture: string,
  ) {
    this.accountRepository.updateAccountDetails(
      id,
      firstName,
      lastName,
      profilePicture,
    );
  }

  /**
   * handles updates to accont data together with pos. updates to data contained in the associated user i.e email & password
   * @param userId
   * @param firstName
   * @param lastName
   * @param email
   * @param newPassword
   */
  public async updateAccount(
    userId: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    newPassword?: string,
    profilePicture?: string,
    weekavailability?: number,
    introvert?: boolean,
    isHidden?: boolean,
    biography?: string,
  ) {
    const existingUser = await this.userRepository.getUserById(userId);
    if (!existingUser) {
      throw new Error("User not found.");
    }
    try {
      let hashedPassword: string;
      if (newPassword) {
        hashedPassword = await hash(newPassword, 10);
      }
      await this.accountRepository.updateAccountAndUserDetails(
        userId,
        firstName,
        lastName,
        email,
        hashedPassword,
        profilePicture,
        weekavailability,
        introvert,
        isHidden,
        biography,
      );
    } catch (error) {
      console.error("Error updating account:", error.message);
      throw new Error("Error updating account. : " + error.message);
    }
  }
}
