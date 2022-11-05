const User = require('../../models/user/users');

//@desc					Get all
//@route 				GET
//@access 			Public
exports.postUser = (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ success: true, msg: 'Show all' });
};
