const User = require('../../models/user/Users');

//@desc					Get all
//@route 				GET
//@access 			Public
exports.postUser = async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
};
