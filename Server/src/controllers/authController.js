import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//here firstly i set up a signup route for users

export async function signup(req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be of minm length 6" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser != null) {
      return res.json({ message: "Email already exists,Please login" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://robohash.org/00${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: avatar,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

    res.cookie("jwt", token, {
      httOnly: true,
      sameSite: "strict",
    });
    res.status(201).json({ message: "signup successful" });
  } catch (error) {
    console.log("error in signup controller");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ messsage: "both fields are required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in login");
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

//this si to logout the user form the app
export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(201).json({ success: true, message: "logout successful" });
}
