import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: String, // String is shorthand for {type: String}
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now() },
});

const PostModel = model("Posts", postSchema);

export default PostModel;
