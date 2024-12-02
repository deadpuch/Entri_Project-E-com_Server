import { SELLER } from "../models/salesModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import mongoose from "mongoose";
import { cloudnaryInstance } from "../config/cloudinary.js";

export const salesSignup = async (req, res, next) => {
  try {
    const { name, company_name, GST_no, Email, password, mobile, profilePic } =
      req.body;

    if (!name || !Email || !password || !company_name || !GST_no || !mobile) {
      return res.status(400).json({ message: "all field required" });
    }

    const salesExist = await SELLER.findOne({ Email });

    if (salesExist) {
      return res.status(400).json({ message: "seller already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newsales = new SELLER({
      name,
      Email,
      company_name,
      GST_no,
      password: hashedPassword,
      mobile,
      profilePic,
    });
    await newsales.save();

    const token = generateToken(newsales, "salesUser");
    res.cookie("token", token);

    res.json({ message: "seller user created successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const salesLogin = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ message: "all field required" });
    }
    const checkSales = await SELLER.findOne({ Email });

    if (!checkSales) {
      return res.status(404).json({ message: "seller user not found" });
    }

    const checkPassowrd = bcrypt.compareSync(password, checkSales.password);

    if (!checkPassowrd) {
      return res.status(400).json({ message: "seller user not authenticated" });
    }

    const sellerActive = await SELLER.findOne({ Email, Active: true });

    if (!sellerActive) {
      return res.status(403).json({ message: "account has been banned" });
    }

    const token = generateToken(checkSales, "salesUser");
    res.cookie("token", token);

    res.json({ message: "seller user Login successfull" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};


export const salesProfile = async (req, res, next) => {
  try {
    const salesId = req.sales.id;

    const salesProfile = await SELLER.findById(salesId).select("-password");

    console.log(salesId,"===sales");
    

    res.json({ message: "profile fetch successfully", data: salesProfile });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};


export const salesProfileUpdate = async (req, res, next) => {
  try {
    const { name, Email, company_name, profilePic } = req.body;
    const salesId = req.sales.id;

    const profile = req.file;
    const propic = (await cloudnaryInstance.uploader.upload(profile.path)).url;



    await SELLER.updateOne(
      { _id:salesId},
      {
        $set: {
          name: name,
          Email: Email,
          company_name: company_name,
          profilePic: propic,
        },
      }
    );

    res.json({ message: "profile updated success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};


export const salesResetPassword = async (req, res, next) => {
  try {
    const { Email, updatedPassword } = req.body;
    const findsales = await SELLER.findOne({ Email });

    if (!findsales) {
      return res.json({ message: "seller not authenticated" });
    }

    const passwordHash = bcrypt.hashSync(updatedPassword, 10);

    await SELLER.updateOne(
      { Email: Email },
      { $set: { password: passwordHash } }
    );

    res.json({ message: "password changed succefully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};



export const salesLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.json({ message: "seller logout successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};


export const salesDeleteAccount = async (req, res, next) => {
  try {
    const salesId = req.sales.id;
    await SELLER.deleteOne({ _id:salesId});

    res.json({ message: "account deleted" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const checkSaleUser = async (req, res, next) => {
  try {
    res.json({ message: " seller user Verified" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};
