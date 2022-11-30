const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../../middleware/async/async');
const UserRegister = require('../../models/auth/userRegister');
const UserLogin = require('../../models/auth/userLogin');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

//@desc					Register user
//@route 				POST
//@access 			Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //Check if data exist
    const dataExist = await UserRegister.findOne({ email: email });
    if (dataExist) {
      return next(new ErrorResponse('email already exist!', 404));
    } else if (name === '' || email === '' || password === '') {
      //Check if fields are empty
      return next(new ErrorResponse('Please complete the fields', 404));
    } else {
      const userLogins = await UserRegister.create({
        name,
        email,
        password,
      });
      //Create token
      const token = userLogins.getSignedJwtToken();
      res.status(200).json({
        success: true,
        message: 'Te-ai inregistrat cu success!',
        data: userLogins,
        token: token,
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
    const user = await UserRegister.findOne({ email: email }).select('+password');
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
const sendTokenResponse = async (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 60000),
    httpOnly: true,
    isLoggedIn: true,
    token: token,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options, user).json({
    success: true,
    message: 'Te-ai logat cu success!',
    cookies: options,
    data: user,
  });
};

exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
