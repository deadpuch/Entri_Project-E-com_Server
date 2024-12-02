import { ADMIN } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { cloudnaryInstance } from "../config/cloudinary.js";
import { User } from "../models/userModel.js";
import { SELLER } from "../models/salesModel.js";
import { MOBILECAROSAL } from "../models/createAd.js";

export const adminSignup = async (req, res, next) => {
  try {
    const { name, Email, password, profilePic } = req.body;

    if (!name || !Email || !password) {
      return res.status(400).json({ message: "all field required" });
    }

    const adminExist = await ADMIN.findOne({ Email });

    if (adminExist) {
      return res.status(400).json({ message: "admin already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newadmin = new ADMIN({
      name,
      Email,
      password: hashedPassword,
      profilePic,
    });
    await newadmin.save();

    const token = generateToken(newadmin, "admin");
    res.cookie("token", token);

    res.json({ message: "admin created successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ message: "all field required" });
    }
    const checkadmin = await ADMIN.findOne({ Email });

    if (!checkadmin) {
      return res.status(404).json({ message: "admin not found" });
    }

    const checkPassowrd = bcrypt.compareSync(password, checkadmin.password);

    if (!checkPassowrd) {
      return res.status(400).json({ message: "admin not authenticated" });
    }

    const token = generateToken(checkadmin, "admin");
    res.cookie("token", token);

    res.json({ message: "admin Login successfull" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const adminResetPassword = async (req, res, next) => {
  try {
    const { Email, updatedPassword } = req.body;
    const findadmin = ADMIN.findOne({ Email });

    if (!findadmin) {
      return res.json({ message: "admin not authenticated" });
    }

    const passwordHash = bcrypt.hashSync(updatedPassword, 10);

    await ADMIN.updateOne(
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

export const adminProfile = async (req, res, next) => {
  try {
    const adminId = req.admin.id;

    const adminProfile = await ADMIN.findById(adminId).select("-password");

    res.json({ message: "profile fetch successfully", data: adminProfile });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const adminProfileUpdate = async (req, res, next) => {
  try {
    const { name, Email, profilePic } = req.body;
    const adminId = req.admin.id;
    const profile = req.file;

    const propic = (await cloudnaryInstance.uploader.upload(profile.path)).url;
    await ADMIN.updateOne(
      { _id: adminId },
      { $set: { name: name, Email: Email, profilePic: propic } }
    );

    res.json({ message: "profile updated success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.json({ message: "admin logout successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    res.json({ message: "admin verified" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const adminDeleteAccount = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    await ADMIN.deleteOne({ _id: adminId });

    res.json({ message: "account deleted" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const getAlluser = async (req, res, next) => {
  try {
    const allUser = await User.find();

    res.json({ message: "all user data fetched", data: allUser });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const Terminateuser = async (req, res, next) => {
  try {
    const { Active } = req.body;
    const { userId } = req.params;

    const userActive = await User.findOneAndUpdate(
      { _id: userId }, // Find the user by ID
      { $set: { Active: Active } }, // Update the 'active' field
      { new: true } // Return the updated document
    );
    if (!userActive) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User terminated successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const getAllSellers = async (req, res, next) => {
  try {
    const allUser = await SELLER.find();

    res.json({ message: "all user data fetched", data: allUser });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const TerminateSeller = async (req, res, next) => {
  try {
    const { Active } = req.body;
    const { sellerId } = req.params;

    const userActive = await SELLER.findOneAndUpdate(
      { _id: sellerId }, // Find the user by ID
      { $set: { Active: Active } }, // Update the 'active' field
      { new: true } // Return the updated document
    );
    if (!userActive) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User terminated successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

export const addAdvImage = async (req, res, next) => {
  try {
    const { img } = req.body;

    // if (!img) {
    //   return res.json({ message: "Add Image" });
    // }

    console.log(req.files);

    const arrayImage = req.files.advImages;
    const itemImg = arrayImage.map((file) =>
      limit(async () => {
        const imageUrl = (await cloudnaryInstance.uploader.upload(file.path))
          .url;
        return imageUrl;
      })
    );

    const newAdvImg = new MOBILECAROSAL({
      img: imageUrl,
    });

    await newAdvImg.save();
    res.json({ message: "image added successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};
