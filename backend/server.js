import dotenv from 'dotenv'; 
dotenv.config(); 

import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import { sendConfirmationEmail } from './utils/emailSender.js'; 
import JobSeeker from './models/JobSeeker.js'; 
import EmployerWaitlist from './models/EmployerWaitlist.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// Database Connection 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('API is running...');
});
/**
 * @route POST /api/jobseeker
 * @desc Register a new job seeker and send confirmation email
 * @access Public
 */
app.post('/api/jobseeker', async (req, res) => {
    try {
        const { dateFrom, firstName, email } = req.body; 

        const jobSeekerData = {
            ...req.body,
            dateFrom: new Date(dateFrom),
            dateUntil: req.body.dateUntil ? new Date(req.body.dateUntil) : undefined,
        };

        const newJobSeeker = new JobSeeker(jobSeekerData);
        await newJobSeeker.save();
        
        // --- Call Email Utility ---
        sendConfirmationEmail(email, firstName)
            .catch(err => {
                console.error('Failed to send Job Seeker confirmation email:', err.message);
            });
        // -------------------------

        res.status(201).json({ 
            message: 'Job Seeker registration successful', 
            id: newJobSeeker._id 
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message, details: err.errors });
        }
        if (err.code === 11000) { // Duplicate email
            return res.status(409).json({ error: 'Email already registered' });
        }
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
 * @route POST /api/employer
 * @desc Add employer to the waitlist and send confirmation email
 * @access Public
 */
app.post('/api/employer', async (req, res) => {
    try {
        const { email, name } = req.body;
        
        const firstName = name.split(' ')[0] || 'Applicant';

        const newEmployer = new EmployerWaitlist(req.body);
        await newEmployer.save();
        
        // --- Call Email Utility ---
        sendConfirmationEmail(email, firstName) 
            .catch(err => {
                console.error('Failed to send Employer confirmation email:', err.message);
            });
        // -------------------------

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