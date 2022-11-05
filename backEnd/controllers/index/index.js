//@desc					Get all
//@route 				GET
//@access 			Public
exports.getIndex = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all' });
};
