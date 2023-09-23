const { Schema, model } = require('mongoose');

const otpSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 120 },
    },
  },
  { timestamps: true }
);
