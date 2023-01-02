const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('../config');

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret, // secret key used to sign the jwt
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract jwt from authorization header
  },
  (token, done) => done(null, token.user)
);

module.exports = jwtStrategy;
