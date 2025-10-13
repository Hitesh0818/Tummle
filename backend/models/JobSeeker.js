import mongoose from 'mongoose';

// Sub-schema for nested complex objects
const RoleWithExperienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    experience: { type: String, enum: ['none', 'basic', 'advanced', 'professional'], default: 'none' }
}, { _id: false });

const LanguageWithLevelSchema = new mongoose.Schema({
    language: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'conversational', 'advanced', 'fluent'], required: true }
}, { _id: false });

const LocationWithRadiusSchema = new mongoose.Schema({
    placeId: { type: String, required: true },
    formattedAddress: { type: String, required: true },
    name: { type: String, required: true },
    // Only store basic, relevant location/radius data for backend simplicity
    radius: { type: Number, default: null },
    radiusUnit: { type: String, default: 'km' },
    level: { type: String } 
}, { _id: false });

const SocialMediaLinkSchema = new mongoose.Schema({
    platform: { type: String, required: true },
    url: { type: String, required: true }
}, { _id: false });

const JobSeekerSchema = new mongoose.Schema({
    // Preferences
    jobRoles: { type: [RoleWithExperienceSchema], required: true },
    
    // Availability
    locations: { type: [LocationWithRadiusSchema], required: true },
    dateFrom: { type: Date, required: true },
    dateUntil: { type: Date, default: null },
    weekSchedule: { type: [String], required: true }, // e.g., ['monday-morning', 'tuesday-afternoon']
    hoursPerWeekMin: { type: Number, default: 0 },
    hoursPerWeekMax: { type: Number, default: 40 },

    // Education & Skills
    educationLevel: { type: String, required: true },
    languages: { type: [LanguageWithLevelSchema], required: true },
    drivingLicenses: { type: [String], default: [] },
    professionalCertifications: { type: [String], default: [] },

    // Personal Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    mobile: { type: String },
    socialMediaLinks: { type: [SocialMediaLinkSchema], default: [] },

    // Consent
    dataConsent: { type: Boolean, required: true },
    termsConsent: { type: Boolean, required: true },

    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);