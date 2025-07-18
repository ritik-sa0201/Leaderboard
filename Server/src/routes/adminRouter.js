import express from "express";

import {
  addUser,
  AdminClaims,
  deleteUser,
  getHistory,
  getUsers,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/isAdmin", (req, res) => {
  res.status(200).json({ message: "yes you are an admin" });
});

adminRouter.get("/users", getUsers);
adminRouter.post("/addUser", addUser); //this allows our admin to add custom users

adminRouter.post("/deleteUser", deleteUser);

adminRouter.post("/addPoints", AdminClaims);

adminRouter.get("/history", getHistory);

export default adminRouter;
