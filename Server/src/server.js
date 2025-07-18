import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import { connectDB } from "./lib/db.js";
import adminOnly from "./middlewares/admin.js";
import { protectedRoute } from "./middlewares/protectedRoutes.js";
import adminRouter from "./routes/adminRouter.js";
import leaderboardRouter from "./routes/Leaderbaord.js";
import userRouter from "./routes/userRouter.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://leaderboard-production-3a27.up.railway.app",
    credentials: true,
  })
);
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello there");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", protectedRoute, adminOnly, adminRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/user", protectedRoute, userRouter);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
