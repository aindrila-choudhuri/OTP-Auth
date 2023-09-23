const { Schema, model } = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new error('Email is invalid');
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString(), number: user.number }, process.env.JWT_SECRET);

  // user.tokens = user.tokens.concat({ token });
  // await user.save();

  return token;
};

module.exports.User = model('user', userSchema);
