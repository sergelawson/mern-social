import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcryptjs";
import _ from "lodash";

/**
 * @desc Create a new user account
 * @route POST /api/users/create
 * @access Public
 */

export const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // validting request paramaters
  const { error, value } = schema.validate(
    _.pick(req.body, ["fullName", "email", "password"])
  );

  if (error) return res.status(400).json({ message: error });

  try {
    // Check if user exsits
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      fullName: fullName,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Error server database");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};

/**
 * @desc Create a new user account
 * @route POST /api/users/login
 * @access Public
 */

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // validting request paramaters
  const { error, value } = schema.validate(
    _.pick(req.body, ["email", "password"])
  );

  if (error) return res.status(400).json({ message: error });

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "user not found" });

    // Compare password
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid) {
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Email or password invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};

/**
 * @desc Get user informations
 * @route GET /api/users/getMe
 * @access Private
 */

export const getMe = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await UserModel.findOne({ _id }).select("-password");

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
