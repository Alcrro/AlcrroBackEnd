const express = require('express');
const { postGroup } = require('../../controllers/group/group');
const router = express.Router();

router.route('/').post(postGroup);

module.exports = router;
