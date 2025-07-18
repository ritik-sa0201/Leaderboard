import User from "../models/userModel.js";

export async function standings(req, res) {
  try {
    const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });

    const usersWithRanking = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));

    res.json({ data: usersWithRanking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function UserCount(req, res) {
  try {
    const count = await User.countDocuments({ role: { $ne: "admin" } });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
