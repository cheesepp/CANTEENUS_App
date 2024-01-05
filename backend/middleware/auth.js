const ErrorHandler = require("../util/ErrorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require('dotenv').config()

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log("authHeader: ",authHeader)
  if(!authHeader || authHeader === 'Bearer undefined' || !authHeader.startsWith("Bearer ")){
    return next(new ErrorHandler("Please login to continue",401));
  }

  //console.log("req.body:", req.body)
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findByPk(decoded.id);
  req.userId = currentUser.dataValues.id;
  console.log(req.userId)
  next();
});
