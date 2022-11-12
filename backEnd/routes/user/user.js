const express = require('express');
const {
  getUser,
  UpdateUser,
  deleteUser,
  getSingleUser,
} = require('../../controllers/user/user');
const router = express.Router();

router.route('/').get(getUser);
router.route('/:id').get(getSingleUser);
router.route('/:id').put(UpdateUser).delete(deleteUser);

module.exports = router;
