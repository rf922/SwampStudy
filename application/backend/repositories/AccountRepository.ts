import { Account } from "./../entities/account.entity";
import { User } from "./../entities/user.entity";
import { Question } from "./../entities/question.entity";
import { Answer } from "./../entities/answer.entity";
import { Thread } from "./../entities/thread.entity";
import { myDataSource } from "./../app-data-source";

/**
 * custom repo to handle account related data manipulation,
 * our data access layer interacts with acc data in the db
 */
export const AccountRepository = myDataSource.getRepository(Account).extend({
  async getAccountById(id: number) {
    return await this.findOneBy({
      id,
    });
  },

  async getAccountDetails(id: number) {
    return await this.findOne({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        profile_picture: true,
        biography: true,
        educator: true,
        introvert: true,
        isHidden:true,
        weekavailability: true,
        // optionally in the future we may want to grab more fields
      },
      //  relations: ['classSchedules']
    });
  },

  async updateAccountDetails(
    userId: number,
    firstName: string,
    lastName: string,
    profilePicture?: string,
  ) {
    const updateData: Record<string, string> = {};
    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (profilePicture !== undefined)
      updateData.profile_picture = profilePicture;

    if (Object.keys(updateData).length > 0) {
      await this.update({ user_FK: userId }, updateData);
    }
  },

  async updateAccountAndUserDetails(
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
    await myDataSource.transaction(async (transactionalEntityManager) => {
      // start a transaction, for safety to ensure all code in the transaction executes correctl
      if (email || newPassword) {
        // if there's an email or newPassword, update the User entity
        const userRepo = transactionalEntityManager.getRepository(User);
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) throw new Error("User not found.");

        // if the field is present update it
        if (email) user.email = email;
        if (newPassword) user.password = newPassword;
        // save the user
        await userRepo.save(user);
      }

      // update the account entity
      const accountRepo = transactionalEntityManager.getRepository(Account);
      const account = await accountRepo.findOneBy({ id: userId }); // get acc by id
      if (!account) throw new Error("Account not found.");

      //if the fields are present update them.
      if (firstName !== undefined) account.first_name = firstName;
      if (lastName !== undefined) account.last_name = lastName;
      if (profilePicture !== undefined)
        account.profile_picture = profilePicture;
      if (weekavailability !== undefined)
        account.weekavailability = weekavailability;
      if (introvert !== undefined) account.introvert = introvert;
      if (isHidden !== undefined) account.isHidden = isHidden;
      if (biography !== undefined) account.biography = biography;
      await accountRepo.save(account);
    });
  },

  async deleteAccount(userId: number): Promise<string> {
    try {
      await myDataSource.transaction(async (transactionalEntityManager) => {
        //use a transaction again to ensurre data/db integrity
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            // from the user repo find the user
            where: { id: userId },
            relations: [
              // bring its associated acc, that accs question and that accs answers
              "account",
              "account.questions",
              "account.questions.thread",
              "account.questions.thread.answers",
            ],
          });

        if (!user || !user.account) {
          throw new Error("User or associated account not found.");
        }

        for (const question of user.account.questions) {
          //foreach question
          if (question.thread) {
            // for each question delete its associated anser and thread
            await transactionalEntityManager.delete(Answer, {
              thread: question.thread.id,
            });
            await transactionalEntityManager.delete(Thread, {
              id: question.thread.id,
            });
          }
        }

        //delete the question, account and user
        await transactionalEntityManager.delete(Question, {
          account: user.account.id,
        });
        await transactionalEntityManager.delete(Account, {
          id: user.account.id,
        });
        await transactionalEntityManager.delete(User, { id: userId });
      });
      return "Account deleted successfully.";
    } catch (error) {
      console.error("Error deleting account:", error.message);
      throw new Error("Error deleting account.:" + error.message);
    }
  },
});
