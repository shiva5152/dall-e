import * as dotenv from "dotenv";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { AzureOpenAI } from "openai";
dotenv.config();

const dalleRequest = async (req, res, next) => {
  const { prompt, resolution } = req.body;
  console.log(prompt, resolution);

  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const model = process.env.AZURE_OPENAI_MODEL;

  const client = new AzureOpenAI({
    deployment,
    apiVersion,
    endpoint,
    apiKey,
  });
  const results = await client.images.generate({
    prompt,
    model,
    n: 1,
    size: resolution,
  });

  console.log(results);
  res.status(200).json({ photo: results.data[0].url });
};
export default dalleRequest;
