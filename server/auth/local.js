const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email', // default is 'username'
  },
  async (email, password, done) => {
    // callback function
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'User not found' });
      // if (!user.status) return done(null, false, { message: 'Email verification is pending' });

      const valid = await user.isValidPassword(password);
      if (!valid) return done(null, false, { message: 'Invalid password' });

      return done(null, user.toJSON());
    } catch (err) {
      done(err);
    }
  }
);

module.exports = localStrategy;
