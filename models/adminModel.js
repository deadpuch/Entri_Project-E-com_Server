import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    profilePic: {
      type: String,
      default:
        "https://www.vecteezy.com/vector-art/20765399-default-profile-account-unknown-icon-black-silhouette",
    },
  },

  {
    timestamps: true,
  }
);

export const ADMIN = mongoose.model("admin", adminSchema);
