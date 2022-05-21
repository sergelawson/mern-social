import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} from "../controllers/postsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
router.route("/:id/like").post(likePost).delete(unlikePost);

export default router;
