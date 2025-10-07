// backend/utils/emailSender.js

const nodemailer = require('nodemailer');

// These environment variables are now guaranteed to be loaded 
// because dotenv.config() runs first in server.js.
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SENDER_EMAIL = process.env.SENDER_EMAIL; // hitesh.babariya@tummle.com

// 1. Create a Transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // mail.all-inkl.com
    port: process.env.EMAIL_PORT, // 587
    secure: process.env.EMAIL_PORT == 465, // false for port 587
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    logger: true,
    debug: true
});

/**
 * Sends a confirmation email to the user.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} firstName - The recipient's first name.
 */
async function sendConfirmationEmail(toEmail, firstName) {
    const safeFirstName = firstName || 'Applicant';

    const mailOptions = {
        from: SENDER_EMAIL,
        to: toEmail,
        subject: 'TUMMLE: Your Registration Confirmation',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <p>Dear ${safeFirstName},</p>
                
                <p>Thank you for registering with TUMMLE! Your profile is now active.</p>
                
                <p>Our smart matching algorithm is now searching for the perfect part-time, side job, or seasonal job that fits your preferences and availability.</p>

                <p>You will be contacted by matching employers directly. No searching, no swiping, just great job offers.</p>

                <p>If you have any questions, please reply to this email.</p>
                
                <p>Best regards,</p>
                <p>The Tummle Team</p>
            </div>
        `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        // The error log that helped identify the ECONNREFUSED error
        console.error('ERROR sending confirmation email:', error.message); 
        return { success: false, error };
    }
}

module.exports = {
    sendConfirmationEmail
};