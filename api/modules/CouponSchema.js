const mongoose = require("mongoose");

const Coupon = new mongoose.Schema(
  {
    offer: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    offer_desc: {
      type: String,
      required: true,
    },
    cashback: {
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

module.exports = mongoose.model("Coupon", Coupon);
