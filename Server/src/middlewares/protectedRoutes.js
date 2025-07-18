import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export async function protectedRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "unauthorized no token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized invalid token" });
    }
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "user not found" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}
