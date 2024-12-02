import mongoose, { Schema } from "mongoose";

const reviewSchema = mongoose.Schema({
  user_data: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    // required: true,
  },

  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  comment: {
    type: String,
    trim: true,
    maxlength: 500,
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const REVIEW = mongoose.model("review", reviewSchema);
