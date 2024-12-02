import mongoose from "mongoose";
import { Cart } from "../models/cartModel.js";
import { PRODUCT } from "../models/productModel.js";

export const addToCart = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const userId = req.user.id; // Corrected the way userId is accessed
    const { productId } = req.params;

    // Fetch product details from Product model
    const product = await PRODUCT.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = product.price;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      // Update quantity of the existing product
      existingProduct.quantity += quantity;
    } else {
      // Add the new product to the cart
      cart.products.push({ productId, quantity, price });
    }

    // Save the updated cart
    const addedItems = await cart.save();

    res
      .status(200)
      .json({ message: "Product added to cart", data: addedItems });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getAllItem = async (req, res, next) => {
  try {
    const userId = req.user.id;

    console.log(userId);

    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "cart items fetched", data: cart });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => !item.productId.equals(productId)
    );

    await cart.save();
    res.status(200).json({ message: "product removed from cart" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
