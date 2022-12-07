const express = require('express');
const { registerUser, loginUser, logoutUser, getMe } = require('../../controllers/auth/auth');
// const { authSessions } = require('../../controllers/auth/authSessions');
const router = express.Router();

const { protect } = require('../../middleware/auth/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);
router.route('/logout').post(logoutUser);

module.exports = router;
