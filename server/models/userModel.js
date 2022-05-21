import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_img: String,
});

const UserModel = model("User", userSchema);

export default UserModel;
