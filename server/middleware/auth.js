import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const isAuthenticatedUser=catchAsyncError(
    async(req,res,next)=>{
        const {token}=req.cookies;

        if(!token){
            return next(new ErrorHandler("Please Login to access this resource",401));
        }

        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        req.user =await User.findOne({_id:decodedData.id})
        next();
    }
)

export default isAuthenticatedUser;