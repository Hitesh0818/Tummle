import mongoose from 'mongoose';
const EmployerWaitlistSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    joinDate: { type: Date, default: Date.now }
});

export default mongoose.model('EmployerWaitlist', EmployerWaitlistSchema);