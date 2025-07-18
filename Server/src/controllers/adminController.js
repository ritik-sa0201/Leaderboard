import claimModel from "../models/pointsModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
export async function deleteUser(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required in the request body" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "Admins cannot delete themselves" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function addUser(req, res) {
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
    res.status(201).json({ message: "user created  successful" });
  } catch (error) {
    console.log("error in admin controller");
  }
}

export async function AdminClaims(req, res) {
  try {
    const { selectedId } = req.body;

    if (!selectedId) {
      req
        .status(400)
        .json({ message: "please select a user to give points to" });
    }
    const user = await User.findById(selectedId);

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const addHistory = await claimModel.create({
      userId: selectedId,
      pointsAwarded: points,
    });

    res.json({
      message: "Points claimed successfully",
      user: selectedId,
      pointsAwarded: points,
      claimHistory: addHistory,
    });
  } catch (error) {
    console.log("error adding points by admin");
    res.status(500).json({
      success: false,
      message: "Internal server error while awarding points",
    });
  }
}
export async function getUsers(req, res) {
  try {
    const users = await User.find().sort({ fullName: 1 }); // 1 = ascending (A to Z)
    res.status(200).json({ message: "ok", users: users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error fetching users", error: error.message });
  }
}

export async function getHistory(req, res) {
  try {
    const history = await claimModel
      .find()
      .sort({ claimedAt: -1 })
      .limit(6)
      .populate({
        path: "userId",
        select: "fullName",
      });

    res.status(200).json({ message: "ok", history: history });
  } catch (err) {
    res
      .status(401)
      .json({ message: "error fetching admin history", error: err.message });
  }
}
