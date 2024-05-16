import { myDataSource } from "./../app-data-source";
import { User } from "./../entities/user.entity";
import { Account } from "./../entities/account.entity";
import { validate } from "class-validator";
import { Not } from "typeorm";

export const UserRepository = myDataSource.getRepository(User).extend({
  /**
   * gets a user by email
   * @param email
   * @returns the user found
   */
  async getUserByEmail(email: string) {
    return this.findOneBy({ email });
  },

  /**
   * gets a user by Id
   * @param id
   * @returns the user found
   */
  async getUserById(id: number) {
    return await this.findOne({
      where: { id },
      relations: ["account"],
    });
  },

  /**
   * report a user by incrementing the report count for the passed userID.
   * @param reportedUserId The ID of the user to report.
   */
  async reportUser(reportedUserId: number) {
    const user = await this.findOneBy({ id: reportedUserId });
    user.reports += 1; // Increment the reports count
    return await this.save(user);
  },

  /**
   * function to return a list of users , their schedules and classes
   * @param page
   * @returns
   */
  async getUserPage(userId: number, page: number) {
    const pageSize = 10;
    const offSet = (page - 1) * pageSize;

    return this.find({
      relations: [
        "account",
        "account.classSchedule",
        "account.classSchedule.class",
        "account.ratings",
      ],
      where: {
        id: Not(userId), //filter the user asking for the page
        account: {
          isHidden: false, //filter hidden accounts
        },
      },
      skip: offSet,
      take: pageSize,
    });
  },

  /**
   * function to return a list of users whose
   * introvert field is true and their schedules and classes
   * @param page
   * @returns
   */
  async getIntrovertPage(userId: number, page: number) {
    const pageSize = 10;
    const offSet = (page - 1) * pageSize;

    return this.find({
      relations: [
        "account",
        "account.classSchedule",
        "account.classSchedule.class",
        "account.ratings",
      ],
      where: {
        id: Not(userId), //filter the user asking for the page
        account: {
          introvert: true, //specifically introverts
          isHidden: false,
        },
      },
      skip: offSet,
      take: pageSize,
    });
  },

  /**
   * perfom updates on email or password for user corresponding to userId
   * may be expandeed as we add new fields to user
   * @param userId
   * @param email
   * @param newPassword
   */
  async updateUserEmailAndPassword(
    userId: number,
    email?: string, //optional param
    newPassword?: string, //optiona param
  ) {
    const user = await this.findOneBy({ id: userId });
    if (!user) throw new Error("User not found.");

    if (email) user.email = email;
    if (newPassword) user.password = newPassword;
    await this.save(user);
  },

  /**
   * handles the creation of a new user and its account
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @param profilePicture
   * @returns
   */
  async createUserWithAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profilePicture?: string,
  ): Promise<User> {
    return await myDataSource.transaction(
      async (transactionalEntityManager) => {
        //transaction to ensurre entire block executes succ or fails so as to not insert fragmented data to db
        const user = transactionalEntityManager.create(User, {
          email: email,
          password: password,
        });

        const userErrors = await validate(user);
        if (userErrors.length > 0) {
          throw new Error("Failed User Data Validation");
        }

        const newUser = await transactionalEntityManager.save(user);

        const account = transactionalEntityManager.create(Account, {
          // create the acc and associate it to its user
          first_name: firstName,
          last_name: lastName,
          profile_picture: profilePicture,
          user_FK: { id: newUser.id },
        });

        const accountErrors = await validate(account);
        if (accountErrors.length > 0) {
          throw new Error("Failed Account Data Validation");
        }

        await transactionalEntityManager.save(account);

        return newUser;
      },
    );
  },
});
