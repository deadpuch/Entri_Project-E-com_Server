import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

});

// Pre-save middleware to update the total price
cartSchema.pre('save', function (next) {
  this.totalPrice = this.products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  next();
});

export const Cart = mongoose.model('cart', cartSchema);

