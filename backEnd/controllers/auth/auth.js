const ErrorResponse = require('../../utilis/errorResponse');
const User = require('../../models/user/Users');

//@desc					Register user
//@route 				POST
//@access 			Public
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  res.status(200).json({ success: true, data: user });
};

//@desc					Login user
//@route 				POST /api/auth/login
//@access 			Public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
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

  res.status(200).json({ success: true, data: user });
};
