import * as dotenv from 'dotenv';
import {Configuration,OpenAIApi} from 'openai';
import catchAsyncError from '../middleware/catchAsyncError.js';
dotenv.config();

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY,

}); 

const openai =new OpenAIApi(configuration);

const dalleRequest=catchAsyncError(
    async(req,res,next)=>{
        const {prompt,resolution} =req.body;
        const aiResponse= await openai.createImage({
        prompt,
        n:2,
        size:`${resolution}`,
        response_format:'b64_json',
        })
        
    const image =aiResponse.data.data[0].b64_json;
    res.status(200).json({photo:image});
 
    }
)
 export default dalleRequest;