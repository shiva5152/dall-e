import User from "../models/user.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import * as dotenv from "dotenv";
dotenv.config();

const signIn = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("please provide all values", 400));
  }
  // if user already exist
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return next(new ErrorHandler("Email alerdy in exist", 400));
  }

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  // if no user with given id
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid  Email or Password", 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid  Email or Password", 401));
  }

  sendToken(user, 200, res);
});

const logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfuly",
  });
});
const getCurrentUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  res.status(200).json({ user });
});

// crateing token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.createJWT();
  // option for cookie ->yet to be understand
  // one day=24*60*60*1000
  const options = {
    httpOnly: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};

export { signIn, login, logOut, getCurrentUser };
