import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { protectedRoute } from "../middlewares/protectedRoutes.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get("/me", protectedRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default authRouter;
