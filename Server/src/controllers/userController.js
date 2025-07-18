import claimModel from "../models/pointsModel.js";
import User from "../models/userModel.js";

export async function history(req, res) {
  try {
    const { _id: id } = req.user;

    const claims = await claimModel
      .find({ userId: id })
      .sort({ claimedAt: -1 }) // 🔥 newest first
      .lean();

    res.status(200).json({ claims });
  } catch (error) {
    console.error("Error fetching claim history:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function userClaims(req, res) {
  try {
    const { _id: id } = req.user;

    if (!id) {
      req
        .status(400)
        .json({ message: "please select a user to give points to" });
    }

    const user = await User.findById(id);

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const addHistory = await claimModel.create({
      userId: id,
      pointsAwarded: points,
    });

    res.json({
      message: "Points claimed successfully",
      user: id,
      pointsAwarded: points,
      claimHistory: addHistory,
    });
  } catch (error) {
    console.log("error adding points by user");
    res.status(500).json({
      success: false,
      message: "Internal server error while awarding points",
    });
  }
}

export async function userPoints(req, res) {
  try {
    const { _id: id } = req.user;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please select a user to give points to" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "Points fetched successfully",
      points: user.totalPoints,
    });
  } catch (error) {
    console.error("Error fetching points by user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching points",
    });
  }
}
