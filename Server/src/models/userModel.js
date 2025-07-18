//name created at totalPoints password email

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//i first create a schema for our users
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    password: { type: String, required: true, minLength: 6 },
    totalPoints: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);
//i created this to have the password storede in hashes
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//this is to match passwords based on password entered by user and stored password

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(
    enteredPassword,
    this.password
  );
  return isPasswordCorrect;
};

//here i craeted a user model
const User = mongoose.model("User", userSchema);

export default User;
