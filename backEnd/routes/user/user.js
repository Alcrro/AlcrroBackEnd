const express = require('express');
const { getUser, postUser } = require('../../controllers/user/user');
const router = express.Router();

router.route('/').post(postUser);

module.exports = router;
