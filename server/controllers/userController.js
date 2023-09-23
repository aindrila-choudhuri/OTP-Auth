const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator');

const { User } = require('../models/userModel');
const { Otp } = require('../models/otpModel');

module.exports.signUp = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // need to add logic for checking with email also
  let user = await User.findOne({
    phoneNumber,
  });
  if (user) return res.status(400).send('User is already registered');

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  await createOtp(phoneNumber, otp);

  user = await new User(req.body);
  user.save();

  // add twilio code to send sms

  res.status(200).send('OTP sent successfully');
};

const createOtp = async (phoneNumber, OTP) => {
  const otp = new Otp({ phoneNumber, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  await otp.save();
};

module.exports.verifyOtp = async (req, res) => {
  const fetchedOtps = await Otp.find({
    phoneNumber: req.body.phoneNumber,
  });

  if (fetchedOtps.length === 0) return res.status(400).send('OTP is expired');

  const validUser = bcrypt.compare(req.body.otp, fetchedOtps[fetchedOtps.length - 1].otp);

  if (fetchedOtps[fetchedOtps.length - 1].phoneNumber === req.body.phoneNumber && validUser) {
    // update isOTPVerified in User only for signup by checking request url signup/verify or signin/verify
    // generate token and return
    // delete all otps for that number
  }
};
