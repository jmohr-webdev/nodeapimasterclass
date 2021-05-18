const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
