const mongoose = require('mongoose');

const URL =
  'mongodb+srv://adedejiomogbehin:adedejiomogbehin@serverless.oojrnir.mongodb.net/?retryWrites=true&w=majority&appName=serverless';

const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(` DB connection established on: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConfig;
