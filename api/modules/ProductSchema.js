const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    offer: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
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
