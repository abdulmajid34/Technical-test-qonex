const jwt = require('jsonwebtoken')

async function authentication(req, res, next) {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authentication