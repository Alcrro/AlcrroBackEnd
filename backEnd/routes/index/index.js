const express = require('express');
const { getIndex } = require('../../controllers/index/index');
const router = express.Router();

const { protect } = require('../../middleware/auth/auth');

router.route('/').get(protect, getIndex);

module.exports = router;
