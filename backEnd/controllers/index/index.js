const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../../middleware/async/async');
const UserRegister = require('../../models/auth/userRegister');
const session = require('express-session');
const userLogin = require('../../models/auth/userLogin');
const protect = require('../../middleware/auth/auth');
const mongoDBStore = require('connect-mongodb-session')(session);

//@desc					Get all
//@route 				GET
//@access 			Public
exports.getIndex = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {}
});
