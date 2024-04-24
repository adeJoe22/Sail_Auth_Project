const { Router } = require('express');
const {
  signUp,
  login,
  getUser,
  getUsers,
} = require('../controllers/auth');
const isAuthorized = require('../middlewares/auth');

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/users', getUsers);
router.use(isAuthorized);
router.get('/user/:id', getUser);

module.exports = router;
