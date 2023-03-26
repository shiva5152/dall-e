import express, { json } from "express";
import * as dotenv from 'dotenv'
import cors from 'cors';
import connectDB from "./mongoDB/connect.js";
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import authRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from "./middleware/error.js";


dotenv.config();
const app = express();

// app middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// app routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async(req,res)=>{
    res.send('Hello from Dall-E!');
})

// error middleware
app.use(errorMiddleware);

// port and listing
const port = process.env.PORT || 8080

const startServer=async ()=>{   
   try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>console.log(`server is runing on ${port}....`))
    }catch(err){
        console.log(err)
    }
}
startServer();