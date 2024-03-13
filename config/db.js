const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Data base Connected at ${mongoose.connection.host}`.bgMagenta);
  } catch (err) {
    console.log(`Error Occured ${err}`);
  }
};

module.exports = connectDb;
