const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.sendSMS = async (otp, phoneNumber) => {
  return client.messages
    .create({
      body: `Your OTP is ${otp}`,
      to: phoneNumber,
      from: process.env.PHONE_NUMBER,
    })
    .then(() => console.log('SMS is sent'))
    .catch((err) => console.log('Error occurred in sending SMS : ', err));
};
