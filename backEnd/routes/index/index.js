const express = require('express');
const { getIndex } = require('../../controllers/index/index');
const router = express.Router();

router.route('/').get(getIndex);

module.exports = router;
