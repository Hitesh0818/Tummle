import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from 'cors'; // <-- 1. IMPORT CORS

dotenv.config({ path: "backend/config/config.env" });

const app = express();

// --- 2. ADD DETAILED CORS CONFIGURATION ---
// This section allows your frontend application to communicate with your backend.
// It's a security feature that you must configure for deployed applications.

const allowedOrigins = [
    'https://www.tummle.com',      // Your deployed frontend domain

];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);

    // If the origin of the request is in our whitelist, allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Otherwise, block it
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This allows cookies to be sent with requests
};

app.use(cors(corsOptions));
// --- END OF CORS CONFIGURATION ---


// Middlewares (must come after CORS, but before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connecting to database
connectDatabase();

// Importing Routes
import postRoute from "./routes/post.js";
import userRoute from "./routes/user.js";
import employerRoute from "./routes/employer.js";
import jobseekerRoute from "./routes/jobseeker.js";

// Using Routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);
app.use("/api/employer", employerRoute);
app.use("/api/jobseeker", jobseekerRoute);

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
