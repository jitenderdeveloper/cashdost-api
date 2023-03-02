const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    phone: {
        type: String,
        required: true,
        index: {
          unique: true,
        },
        match:
        /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
      },
    password: {
      type: String,
      required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
    role: {
      type: String,
      default: 'normal',
    },
    isVerify: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
