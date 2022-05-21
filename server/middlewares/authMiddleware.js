import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decode = jwt.decode(token, process.env.JWT_SECRET);
      // Get user by id from token
      req.user = await UserModel.findById(decode.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorised request" });
    }
  }

  if (!token) return res.status(401).json({ message: "Unauthorised request" });
};
