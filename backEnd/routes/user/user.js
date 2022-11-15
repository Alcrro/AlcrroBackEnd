const express = require('express');
const {
  getUser,
  UpdateUser,
  deleteUser,
  getSingleUser,
  deleteAllUsers,
} = require('../../controllers/user/user');
const router = express.Router();

router.route('/').get(getUser);
router.route('/:id').get(getSingleUser);
router.route('/:id').put(UpdateUser).delete(deleteUser);
router.route('/deleteAllUsers').delete(deleteUser);

module.exports = router;
