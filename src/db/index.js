const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.MONGOURL;

const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(` DB connection established on: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConfig;
