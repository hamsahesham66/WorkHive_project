import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dataBase.js";
import ApiError from "./utils/apiError.js";
import errorMiddleware from "./middleware/errorMiddleWare.js";
import morgan from 'morgan';
import cors from 'cors';

// Import routes
import authRoute from "./api/authRoute.js";
import userRoute from "./api/userRoute.js";
import categoryRoute from "./api/categoryRoute.js";
import contactUsRoute from "./api/contactUsRoute.js";
import serviceProviderRoute from "./api/serviceProviderRoute.js";
import reviewRoute from "./api/reviewRoute.js";
import serviceRoute from "./api/serviceRoute.js";
import serviceProvScheduleRoute from "./api/serviceProvScheduleRoute.js";
import bookingRoute from "./api/bookingRoute.js";
import paymentRoute from "./api/paymentRoute.js";


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
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories",categoryRoute)
app.use("/api/v1/contactUs",contactUsRoute)
app.use("/api/v1", serviceProviderRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1", serviceRoute);
app.use("/api/v1", serviceProvScheduleRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/payments", paymentRoute);

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