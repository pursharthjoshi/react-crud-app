const { jwtAuth } = require('./auth');
const router = require('express').Router();
const user = require('./controllers/user');
// user routes
router.post('/register', user.registerValidate('register'), user.register);
router.post('/login', user.loginValidate(), user.login);
router.post('/update-profile', jwtAuth, user.updateProfile);
router.get('/get-profile', jwtAuth, user.getProfile);
router.get('/get-all-users', jwtAuth, user.findAllUsers);
router.delete('/delete-user/:user', jwtAuth, user.destroy);

module.exports = (app) => {

  app.use('/api', router); // all routes will be prefixed with /api
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'not found' }); // if route not found
  });

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'bad request' }); // if bad request
    }
    next(err);
  });
};
