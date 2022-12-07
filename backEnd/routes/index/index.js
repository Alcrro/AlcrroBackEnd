const express = require('express');
const { getIndex } = require('../../controllers/index/index');
const router = express.Router();

const { protect, authorize } = require('../../middleware/auth/auth');

router.route('/').get(protect, authorize('publisher', 'admin'), getIndex);

module.exports = router;
