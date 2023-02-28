const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    offer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
