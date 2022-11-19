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
    const { name, email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
      return next(
        new ErrorResponse('Please provide an email and password', 400)
      );
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

    // const store = new mongoDBStore({
    //   uri: process.env.MONGO_URI,
    //   collection: 'loginSessions',
    // });

    // session({
    //   secret: 'my secret',
    //   resave: false,
    //   saveUninitialized: false,
    //   store: store,
    //   cookie: { maxAge: 1000 },
    //   email,
    // });
    const findName = await User.findOne({ email: email }).select('name');
    const userSession = await LoginSession.create({
      name: findName.name,
      email,
    });

    session({
      cookie: {
        maxAge: 1000,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Te-ai logat cu success',
      data: user,
      userSession: userSession,
    });
  } catch (err) {
    next(err);
  }
});
