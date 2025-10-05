const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// --- Configuration ---
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware ---
// Enable CORS for the frontend (replace '*' with your frontend URL in production)
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-tummle-frontend.com' : 'http://localhost:3000'
}));
// Body parser for JSON data
app.use(express.json());

// --- Database Connection ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Exit process if connection fails
    });

// --- Import Models ---
const JobSeeker = require('./models/JobSeeker');
const EmployerWaitlist = require('./models/EmployerWaitlist');

// --- API Routes ---

/**
 * @route POST /api/jobseeker
 * @desc Register a new job seeker
 * @access Public
 */
app.post('/api/jobseeker', async (req, res) => {
    try {
        const { dateFrom } = req.body;
        
        // Convert dateFrom string (e.g., '2024-10-25') to Date object for Mongoose
        const jobSeekerData = {
            ...req.body,
            dateFrom: new Date(dateFrom),
            // Optional: dateUntil conversion if present
            dateUntil: req.body.dateUntil ? new Date(req.body.dateUntil) : undefined,
        };

        const newJobSeeker = new JobSeeker(jobSeekerData);
        await newJobSeeker.save();
        
        // Respond with success
        res.status(201).json({ 
            message: 'Job Seeker registration successful', 
            id: newJobSeeker._id 
        });

    } catch (err) {
        // Handle validation errors (e.g., missing required fields, invalid email format)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message, details: err.errors });
        }
        // Handle duplicate email (MongoDB/Mongoose error code 11000 for unique index violation)
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
 * @route POST /api/employer
 * @desc Add employer to the waitlist
 * @access Public
 */
app.post('/api/employer', async (req, res) => {
    try {
        const { email, name, phone } = req.body;

        const newEmployer = new EmployerWaitlist({ email, name, phone });
        await newEmployer.save();

        res.status(201).json({ 
            message: 'Employer successfully added to waitlist', 
            id: newEmployer._id 
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message, details: err.errors });
        }
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Email already on waitlist' });
        }
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// --- Start Server ---
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));