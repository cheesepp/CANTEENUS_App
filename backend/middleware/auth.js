const ErrorHandler = require("../util/ErrorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config()

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || authHeader === 'Bearer undefined' || !authHeader.startsWith("Bearer ")){
    return next(new ErrorHandler("Please login to continue",401));
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
