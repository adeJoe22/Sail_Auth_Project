const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/authRoutes');

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
const appConfig = (app) => {
  app.use(express.json()).use(cors(corsOptions)).use(morgan('tiny'));

  app.use('/api', router);
  return app;
};

module.exports = appConfig;
