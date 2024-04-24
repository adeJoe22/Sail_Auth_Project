const express = require('express');
const appConfig = require('./app');
const dbConfig = require('./db');

const app = express();

const server = async () => {
  try {
    await dbConfig();
    appConfig(app);
    app.listen(4040, () => {
      console.log('Server is running');
    });
  } catch (error) {
    console.error(error);
  }
};

server();
