const Group = require('../../models/group/Groups');

//@desc					Get all
//@route 				GET
//@access 			Public
exports.postGroup = async (req, res, next) => {
  console.log(req.body);
  const group = await Group.create(req.body);
  res.status(201).json({ success: true, data: group });
};
