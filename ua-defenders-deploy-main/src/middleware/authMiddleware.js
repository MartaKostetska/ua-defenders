const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Please, provide authorization header' });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, 'secret-jwt-key');
    console.log(tokenPayload);
    req.user = {
      _id: tokenPayload.userId,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  authMiddleware,
};
