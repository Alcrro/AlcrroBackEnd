const express = require('express');
const { registerUser, loginUser } = require('../../controllers/auth/auth');
const { authSessions } = require('../../controllers/auth/authSessions');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/session').get(authSessions);

module.exports = router;
