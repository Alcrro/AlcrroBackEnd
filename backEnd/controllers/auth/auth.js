const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../../middleware/async/async');
const User = require('../../models/user/Users');
const LoginSession = require('../../models/user/LoginSesion');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

//@desc					Register user
//@route 				POST
//@access 			Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body.email);
  try {
    //Check if fields are empty
    if (name === '' || email === '' || password === '') {
      return next(new ErrorResponse('Please complete the fields', 404));
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: 'Te-ai inrgistrat cu success',
        data: user,
      });
    }
  } catch (err) {
    next(err);
  }
});

//@desc					Login user
//@route 				POST /api/auth/login
//@access 			Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, checkbox } = req.body;
    // Validate email and password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }
    //Check for user
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check if checkbox is true
    if (!checkbox) {
      return next(new ErrorResponse('Login Checkbox need to be true', 401));
    }

    const findName = await User.findOne({ email: email }).select('+name');
    const findLoginSessionName = await LoginSession.findOne({ email: email }).select('+name');

    //Check if is already logged in
    if (findLoginSessionName) {
      return next(new ErrorResponse('You are already loggedIn', 401));
    } else {
      const loginSession = await LoginSession.create({
        name: findName.name,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: 'Te-ai logat cu success',
        data: user,
        loginSession: loginSession,
      });
    }
  } catch (err) {
    next(err);
  }
});
