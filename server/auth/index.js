const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');

exports.createAuthToken = (user) => {
  return jwt.sign({ user }, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    const token = this.createAuthToken(user); // create auth token
    res.json({ token, message: 'Login successful', success: true });
  })(req, res);
};

exports.jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'unauthorized' });
    req.user = user;
    next();
  })(req, res);
};
