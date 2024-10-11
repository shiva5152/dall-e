import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// get all post
const getAllPost = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find({}).sort({ $natural: -1 });
  res.status(200).json({ success: true, data: posts });
});
const getUserPost = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find({ userId: req.user._id }).sort({
    $natural: -1,
  });
  res.status(200).json({ success: true, data: posts });
});

// create a post
const createPost = catchAsyncError(async (req, res, next) => {
  const { name, prompt, photo, userId } = req.body;
  console.log(req.body);
  const photoUrl = await cloudinary.uploader.upload(photo);

  const newPost = await Post.create({
    name,
    prompt,
    photo: photoUrl.url,
    userId,
  });

  res.status(201).json({ success: true, data: newPost });
});

export { getAllPost, createPost, getUserPost };
