import express from "express";
import { standings, UserCount } from "../controllers/leaderBoardController.js";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/standings", standings);
leaderboardRouter.get("/totalUsers", UserCount);
export default leaderboardRouter;
