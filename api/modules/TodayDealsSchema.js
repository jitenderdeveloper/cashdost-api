const mongoose = require("mongoose");

const TodayDeals = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    client_logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    today_offer: {
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

module.exports = mongoose.model("TodayDeals", TodayDeals);
