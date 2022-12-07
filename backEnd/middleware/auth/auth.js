const jwt = require('jsonwebtoken');
const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../async/async');
const User = require('../../models/user/Users');
const userRegister = require('../../models/auth/userRegister');
const userLogin = require('../../models/auth/userLogin');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //transf in array
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  //Make sure token exist
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await userLogin.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});
