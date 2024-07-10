const mongoose = require("mongoose");
const colors = require("colors");
// function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB: ${mongoose.connection.host}`.bgCyan);
  } catch (err) {
    console.error("DB error: ", err, colors.bgRed);
  }
};

module.exports = { connectDB };
