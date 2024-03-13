import { Router } from "express";
import { getThreads, getPosts, createThread, createPost } from "../controllers/forumController";

const router = Router();

router.get("/:accountId/threads", getThreads);
router.get("/threads/:id/posts", getPosts);
router.post("/:accountId/threads", createThread);
router.post("/threads/:id/posts", createPost);

export default router;
