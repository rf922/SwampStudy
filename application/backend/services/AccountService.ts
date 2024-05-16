import { AccountRepository } from "./../repositories/AccountRepository";
import { hash } from "bcryptjs";
import { validateFields } from "./../utils/validationUtils";
/**
 * this class encapsulates acc related business logic,
 * it interfaces between the controller and the data access layer i.e our repositories
 */
export class AccountService {
  /**
   * instantiate account service with its repository dependencies,
   * @param accountRepository
   */
  constructor(private accountRepository: typeof AccountRepository) {
    this.accountRepository = accountRepository;
  }

  /**
   *
   * @param id gets an account by Id
   * @returns
   */
  public async getAccount(id: number) {
    const account = await this.accountRepository.getAccountById(id);
    if (!account) {
      throw new Error("404");
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
    const account = await this.accountRepository.getAccountById(userId);
    if (!account) {
      throw new Error("404");
    }
    const message = await this.accountRepository.deleteAccount(userId);
    return message;
  }

  /**
   * retrieves account details by id
   * @param id
   * @returns
   */
  public async getAccountDetails(id: number) {
    const account = await this.accountRepository.getAccountDetails(id);
    if (!account) {
      throw new Error("404");
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
    const user = await this.accountRepository.getAccountById(id);
    if (!user) {
      throw new Error("404");
    }
    if (!validateFields({ firstName, lastName })) {
      throw new Error("400");
    }
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
    isEducator?: boolean,
  ) {
    if (
      !validateFields({
        firstName,
        lastName,
        email,
        newPassword,
        biography,
        weekavailability,
      })
    ) {
      throw new Error("400");
    }
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
      isEducator,
    );
  }
}
