const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected successfully`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = {
  connect_db,
};
