import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Question } from "../entities/questions.entity";
import { Answer } from "../entities/answer.entity";
import { validate } from "class-validator";

export const getThreads = async (req: Request, res: Response) => {
    const accountId = parseInt(req.params.accountId);
    if (isNaN(accountId)) {
        return res.status(400).json({ message: "Invalid account ID" });
    }

    const results = await myDataSource
        .getRepository(Question)
        .find({
            where: { accountId: accountId }
        });
    return results.length === 0
        ? res.status(404).json({ message: "No threads found" })
        : res.json(results);
};

export const getPosts = async (req: Request, res: Response) => {
    const questionId = parseInt(req.params.id);
    if (isNaN(questionId)) {
        return res.status(400).json({ message: "Invalid question ID" });
    }

    const results = await myDataSource
        .getRepository(Answer)
        .find({
            where: { questionId: questionId }
        });
    return results.length === 0
        ? res.status(404).json({ message: "No posts found" })
        : res.json(results);
};

export const createThread = async (req: Request, res: Response) => {
    const question = myDataSource.getRepository(Question).create(req.body);
    const errors = await validate(question);

    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        await myDataSource.getRepository(Question).save(question);
        return res.status(201).json(question);
    } catch (error) {
        return res.status(500).json({ message: "Error saving the thread", details: error });
    }
};

export const createPost = async (req: Request, res: Response) => {
    const answer = myDataSource.getRepository(Answer).create(req.body);
    const errors = await validate(answer);

    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        await myDataSource.getRepository(Answer).save(answer);
        return res.status(201).json(answer);
    } catch (error) {
        return res.status(500).json({ message: "Error saving the post", details: error });
    }
};
