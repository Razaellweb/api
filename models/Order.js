const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    products: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    paymentProof: {type: String},
    note: {type: String},
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);