import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dataBase.js";
import ApiError from "./utils/apiError.js";
import errorMiddleware from "./middleware/errorMiddleWare.js";
import morgan from 'morgan';

// Import routes
import userRoute from "./api/userRoute.js";
dotenv.config({ path: "config.env" });

//database connection
dbConnection();
//express app
const app = express();
app.use(morgan('dev'));

// middleware
app.use(express.json());
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint works!' });
});

// API routes
app.use("/api/v1/auth", userRoute);

app.all('*',(req,res,next)=>{
  next(new ApiError(`cannot find this route ${req.originalUrl}`,400 ))
})
app.use(errorMiddleware)

const PORT=process.env.PORT;

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