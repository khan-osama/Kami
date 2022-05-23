const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

module.exports = function authorizationMiddleware(req, res, next) {

  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    throw new ClientError(401, 'authentication required');
  }
  const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
};
