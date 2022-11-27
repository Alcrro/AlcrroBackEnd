const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../../middleware/async/async');
const User = require('../../models/user/Users');
const LoginSession = require('../../models/user/LoginSesion');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

//@desc					Get all
//@route 				GET
//@access 			Public
exports.getIndex = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
  } catch (error) {}
});
