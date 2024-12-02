import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productImage: [{
      type: String,
      default:
        "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
    }],

    Product_Quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    thumbnail: {
      type: String,
      default:
        "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
    },

    productDescription: {
      type: String,
    },

    category: {
      type: String,
    },

    admin_data:{
      type: mongoose.Types.ObjectId,
      ref: "admin"
    },

    seller_data:{
      type: mongoose.Types.ObjectId,
      ref: "salesusers"
    },

    review: [{ type: mongoose.Types.ObjectId, ref: "review" }]
  },

  {
    timestamps: true,
  }
);



export const PRODUCT = mongoose.model("products", productSchema);
