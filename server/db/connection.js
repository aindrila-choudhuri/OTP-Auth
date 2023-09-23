const mongoose = require('mongoose');

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        console.log('Connected to DB');
        resolve();
      });
  });
};

const closeDB = () => {
  return mongoose.disconnect();
};

module.exports = { connectDB, closeDB };
