const express = require('express');
const { registerUser, loginUser } = require('../../controllers/auth/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').get(loginUser);

module.exports = router;
