import express from "express";
import {
  history,
  userClaims,
  userPoints,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/history", history);

userRouter.post("/addPoints", userClaims);

userRouter.get("/totalPoints", userPoints);

export default userRouter;
