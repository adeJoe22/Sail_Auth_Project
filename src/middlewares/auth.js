const jwt = require('jsonwebtoken');

const isAuthorized = async (req, res, next) => {
  const headers =
    req.headers.authorization || req.headers['Authorization'];
  try {
    if (headers.startsWith('Bearer ')) {
      const token = headers.split(' ')[1];
      const payload = jwt.verify(token, 'authsecretforsail');
      req.user = payload;
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'User not authorized' });
  }
};

module.exports = isAuthorized;
