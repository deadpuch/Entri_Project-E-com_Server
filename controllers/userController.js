import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import mongoose from "mongoose";
import { cloudnaryInstance } from "../config/cloudinary.js";

export const userSignup = async (req, res, next) => {
  try {
    const { User_name, Email, password, profilePic } = req.body;

    if (!User_name || !Email || !password) {
      return res.status(400).json({ message: "all field required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExist = await User.findOne({ Email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      User_name,
      Email,
      password: hashedPassword,
      profilePic,
    });
    await newUser.save();

    const token = generateToken(newUser, "user");
    res.cookie("token", token);

    res.json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);

    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ message: "all field required" });
    }
    const checkUser = await User.findOne({ Email });

    if (!checkUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const checkPassowrd = bcrypt.compareSync(password, checkUser.password);

    if (!checkPassowrd) {
      return res.status(400).json({ message: "user not authenticated" });
    }

    const activeUser = await User.findOne({ Email,Active: true });

    if (!activeUser) {
      return res.status(403).json({ message: "your account has been banded" });
    }
    const token = generateToken(checkUser, "user");
    res.cookie("token", token);

    res.json({ message: "user Login successfull" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const userResetPassword = async (req, res, next) => {
  try {
    const { mail, updatedPassword } = req.body;
    const finduser = await User.findOne({ mail });

    if (!finduser) {
      return res.json({ message: "user not authenticated" });
    }

    const passwordHash = bcrypt.hashSync(updatedPassword, 10);

    await User.updateOne({ mail: mail }, { $set: { password: passwordHash } });

    res.json({ message: "password changed succefully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userProfile = await User.findById(userId).select("-password");

    res.json({ message: "profile fetch successfully", data: userProfile });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.json({ message: "user logout successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const userProfileUpdate = async (req, res, next) => {
  try {
    const { User_name, Email, password, profilePic } = req.body;

    const userId = req.user.id;
    const profile = req.file;

    const propic = (await cloudnaryInstance.uploader.upload(profile.path)).url;
    await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { User_name: User_name, Email: Email, profilePic: propic } }
    );

    res.json({ message: "profile updated success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const userDeleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await User.deleteOne({ _id: new mongoose.Types.ObjectId(userId) });

    res.json({ message: "account deleted" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    res.json({ message: "user verified" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};
