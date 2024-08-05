import express, { json } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import authRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
// import main from "./utils/temp.js";
import morgan from "morgan";
// to get static file from client
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();

// app middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
// static->frontend
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/dist")));
// app routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Dall-E!");
});
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// error middleware
app.use(errorMiddleware);
// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });

// port and listing
const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is runing on ${port}....`));
  } catch (err) {
    console.log(err);
  }
};
startServer();
