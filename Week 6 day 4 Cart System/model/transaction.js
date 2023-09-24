const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
        type: [
            {
              product:{
                type: mongoose.Types.ObjectId,
                ref: 'mangaProducts',
                require: true,
              },
              quantity: Number,
              _id: false,
            },
        ],
    },
    total: {type: Number, required: true},
  },
//   { timestamps: true }
);

const transactions = mongoose.model("Transaction", transactionSchema);

module.exports = transactions;
