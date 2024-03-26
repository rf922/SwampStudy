import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Account } from "../entities/account.entity";
import { Question } from "../entities/question.entity";
import { Answer } from "../entities/answer.entity";
import { Thread } from "../entities/thread.entity";
import { User } from "../entities/user.entity"; //'users' maybe change name to 'user'
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { hash } from "bcrypt";

export const getAccount = async (req: Request, res: Response) => {
  const results = await myDataSource
    .getRepository(Account)
    .findOneBy({ id: req.params.id as unknown as number });
  if (results === null) {
    res.status(StatusCodes.NOT_FOUND).send("Resource not Found");
  } else {
    return res.send(results);
  }
};

export const details = async (req: Request, res: Response) => {
  const userId = req.session.userId;

  try {
    const result = await myDataSource
      .getRepository(Account)
      .findOneBy({ id: userId as unknown as number });
    if (result === null) {
      res.status(StatusCodes.NOT_FOUND).send("Resource not Found");
    } else {
      return res.send(result);
    }

    const accountData = {
      id: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      profilePicture: result.profile_picture,
    };

    return res.status(StatusCodes.CREATED).send(accountData);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Duplicate Request or DB Error");
  }
};

export const postAccount = async (req: Request, res: Response) => {
  const account = await myDataSource.getRepository(Account).create(req.body);
  const errors = await validate(account);

  if (errors.length > 0) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send("Failed Data Validation"); // Use StatusCodes.UNPROCESSABLE_ENTITY for 422
  } else {
    try {
      const results = await myDataSource.getRepository(Account).insert(account);
      res.status(StatusCodes.CREATED).send(results); // Use StatusCodes.CREATED for successful creation
    } catch (error) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send("Duplicate Request or Invalid Key or DB Error"); // Reuse StatusCodes.UNPROCESSABLE_ENTITY for 422 errors
    }
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).send("User not logged in.");
  }

  const existingUser = await myDataSource
    .getRepository(User)
    .findOneBy({ id: userId });
  if (!existingUser) {
    //ensure the user exists
    return res.status(StatusCodes.NOT_FOUND).send("User not found.");
  }

  const { firstName, lastName, email, newPassword } = req.body;
  try {
    await myDataSource.transaction(async (transactionalEntityManager) => {
      const userRepository = transactionalEntityManager.getRepository(User);
      const accountRepository =
        transactionalEntityManager.getRepository(Account);

      // Updat usr ent
      if (email || newPassword) {
        if (email) existingUser.email = email;
        if (newPassword) existingUser.password = await hash(newPassword, 10); // Hash the new password
        await userRepository.save(existingUser);
      }

      // prep acc ent
      const updateData: Record<string, string> = {};
      if (firstName !== undefined) updateData.first_name = firstName;
      if (lastName !== undefined) updateData.last_name = lastName;

      if (Object.keys(updateData).length > 0) {
        // update only if there's something to update
        await accountRepository.update({ user_FK: existingUser }, updateData);
      }

      res.status(StatusCodes.OK).send("Account updated successfully.");
    });
  } catch (error) {
    console.error("Error updating account:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error updating account.");
  }
};
// del user account and rel. data
export const deleteAccount = async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).send("User not logged in.");
  }

  try {
    const user = await myDataSource.getRepository(User).findOne({
      where: { id: userId },
      relations: [
        // get acc, and rel questions, threads , answers
        "account",
        "account.questions",
        "account.questions.thread",
        "account.questions.thread.answers",
      ],
    });

    if (!user || !user.account) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("User or associated account not found.");
    }

    await myDataSource.transaction(async (transactionalEntityManager) => {
      // delete related answrs, threads, and questions
      for (const question of user.account.questions) {
        if (question.thread) {
          await transactionalEntityManager.delete(Answer, {
            thread: question.thread.id,
          });
          await transactionalEntityManager.delete(Thread, {
            id: question.thread.id,
          });
        }
      }

      await transactionalEntityManager.delete(Question, {
        account: user.account.id,
      });
      await transactionalEntityManager.delete(Account, { id: user.account.id });
      await transactionalEntityManager.delete(User, { id: userId });
    });

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error during account deletion", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error during session destruction.");
      }
    });
    res.clearCookie("connect.sid");
    return res.status(StatusCodes.OK).send("Account deleted successfully.");
  } catch (error) {
    console.error("Error deleting account:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error deleting account.");
  }
};
