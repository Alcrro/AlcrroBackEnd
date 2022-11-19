const ErrorResponse = require('../../utilis/errorResponse');
const asyncHandler = require('../../middleware/async/async');
const User = require('../../models/user/Users');
const Users = require('../../models/user/Users');

//@desc					Get all user
//@route 				GET
//@access 			Public

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({ success: true, TotalUsers: user.length, data: user });
});

//@desc					Get single user
//@route 				GET
//@access 			Public
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

//@desc					Update user
//@route 				PUT
//@access 			Public
exports.UpdateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(400).json({
      success: false,
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc					Delete user
//@route 				DELETE
//@access 			Public
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Acest user nu exista in baza de date!',
    });
  }
  res.status(200).json({
    success: true,
    Message: 'User-ul s-a sters cu success',
  });
});

//@desc					Delete All users
//@route 				DELETE
//@access 			Public
exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.deleteMany({});
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Acest user nu exista in baza de date!',
    });
  }
  res.status(200).json({
    success: true,
    message: 'S-a ster intreaga list de users',
  });
});
