const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../../middleware/async/async');
const UserRegister = require('../../models/auth/userRegister');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

//@desc					Get all
//@route 				GET
//@access 			Public
exports.getIndex = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserRegister.find();
    res.status(200).json({ success: true, data: user });
  } catch (error) {}
});
