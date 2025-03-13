import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dataBase.js";
import ApiError from "./utils/apiError.js";
import errorMiddleware from "./middleware/errorMiddleWare.js";
import morgan from 'morgan';
import cors from 'cors';

// Import routes
import userRoute from "./API/userRoute.js";
dotenv.config({ path: "config.env" });

//database connection
dbConnection();
//express app
const app = express();
app.use(cors());
app.use(morgan('dev'));

// middleware
app.use(express.json());

app.get("/testt", (req, res) => {
  res.send("API is running....");
})
// API routes
app.use("/api/v1/auth", userRoute);

app.all('*',(req,res,next)=>{
  next(new ApiError(`cannot find this route ${req.originalUrl}`,400 ))
})
app.use(errorMiddleware)

const PORT=process.env.PORT || 8000;

  const server=app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
    process.on("unhandledRejection", (err) => {
        console.log(err.name, err.message);
        console.log("UNHANDLED REJECTION! Shutting down...");
        server.close(() => {
        process.exit(1);
        });
    });