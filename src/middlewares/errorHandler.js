const config = require('../config');

// Express 5 forwards errors thrown in async handlers here automatically
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    ...(config.env === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
