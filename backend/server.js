import dotenv from 'dotenv';
dotenv.config(); 

// 2. Convert all remaining requires to imports (Fixes ReferenceError)
import express from 'express'; 
import mongoose from 'mongoose';
import cors from 'cors';
import { sendConfirmationEmail } from './utils/emailSender.js'; 
import JobSeeker from './models/JobSeeker.js'; // Must use .js extension
import EmployerWaitlist from './models/EmployerWaitlist.js'; // Must use .js extension

const app = express();
const PORT = process.env.PORT || 5000; //

// Middleware and DB connection...
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('MongoDB connection error:', err));


// --- API Routes ---

app.post('/api/jobseeker', async (req, res) => {
    try {
        const { dateFrom, firstName, email } = req.body; 
        // ... (data processing)

        const newJobSeeker = new JobSeeker(jobSeekerData);
        await newJobSeeker.save();
        
        // 3. Email sending logic added
        sendConfirmationEmail(email, firstName)
            .catch(err => {
                console.error('Failed to send Job Seeker confirmation email:', err.message);
            });

        res.status(201).json({ 
            message: 'Job Seeker registration successful', 
            id: newJobSeeker._id 
        });

    } catch (err) {
        // ... (error handling)
    }
});

app.post('/api/employer', async (req, res) => {
    try {
        const { email, name } = req.body;
        const firstName = name.split(' ')[0] || 'Applicant';

        const newEmployer = new EmployerWaitlist(req.body);
        await newEmployer.save();
        
        // 3. Email sending logic added
        sendConfirmationEmail(email, firstName) 
            .catch(err => {
                console.error('Failed to send Employer confirmation email:', err.message);
            });

        res.status(201).json({ 
            message: 'Employer successfully added to waitlist', 
            id: newEmployer._id 
        });

    } catch (err) {
        // ... (error handling)
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));