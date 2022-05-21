import mongoose from "mongoose";
import Posts from "../models/postModel.js";
import _ from "lodash";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await Posts.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const post = await Posts.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const user = req.user;
  const postBody = _.pick(
    post,
    "title",
    "messsage",
    "creator",
    "tags",
    "likeCount",
    "selectedFile"
  );
  try {
    const newPost = await Posts.create({ ...postBody, user: user.id });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  const user = req.user;

  const postBody = _.pick(
    post,
    "title",
    "messsage",
    "creator",
    "tags",
    "likeCount",
    "selectedFile"
  );

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json({ message: "No post with that id" });
  try {
    const post = await Posts.findById(_id);

    if (!user.id) return res.status(401).json({ message: "User not found" });

    if (post.user.toString() !== user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedPost = await Posts.findByIdAndUpdate(_id, postBody, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json({ message: "No post with that id" });

  const post = await Posts.findById(_id);

  if (post.user.toString() !== user.id)
    return res.status(401).json({ message: "User not authorized" });

  const deletePost = await Posts.findOneAndRemove(_id);

  res.json({ message: "post deleted succesfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json({ message: "No post with that id" });

  const likedPost = await Posts.findOneAndUpdate(_id, {
    $inc: { likeCount: 1 },
  });

  res.json({ message: "post liked" });
};

export const unlikePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json({ message: "No post with that id" });

  const unlikedPost = await Posts.findOneAndUpdate(_id, {
    $inc: { likeCount: -1 },
  });

  res.json({ message: "post unliked" });
};
