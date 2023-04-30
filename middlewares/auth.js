const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/unauthorizedError');

module.exports = (req, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
