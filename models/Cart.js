const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    products: { type: Array, required: true },
    status: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
