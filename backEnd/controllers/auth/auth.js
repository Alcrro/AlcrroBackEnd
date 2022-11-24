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
      sendTokenResponse(user, 200, res);
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

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
});

//Get token  from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

exports.logoutUser = asyncHandler(async (req, res, next) => {
  //add value
  const { name } = req.body;

  const alreadyLoggedIn = LoginSession.findById({ name: name });
});
