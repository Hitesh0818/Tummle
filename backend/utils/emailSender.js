// backend/utils/emailSender.js

import nodemailer from 'nodemailer';

// Module-scoped variable to hold the initialized transporter (starts as null)
let emailTransporter = null; 

/**
 * Initializes the Nodemailer transporter using environment variables.
 * This is called only once on the first email attempt, guaranteeing ENVs are loaded.
 */
function createTransporter() {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_HOST = process.env.EMAIL_HOST;
    const EMAIL_PORT_INT = parseInt(process.env.EMAIL_PORT, 10) || 587; // Default to 587 if missing

    // CRITICAL SAFETY CHECK: If the host is missing, we stop here.
    if (!EMAIL_HOST) {
        console.error("ERROR: EMAIL_HOST is missing. Cannot create mail transporter.");
        return null;
    }

    console.log(`[DEBUG] Initializing Transporter for: ${EMAIL_HOST}:${EMAIL_PORT_INT}`);
    
    return nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT_INT,
        // Use strict numeric comparison: true for 465 (SSL), false for 587 (STARTTLS)
        secure: EMAIL_PORT_INT === 465, 
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        logger: true,
        debug: true
    });
}

/**
 * Sends a confirmation email to the user.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} firstName - The recipient's first name.
 */
async function sendConfirmationEmail(toEmail, firstName) {
    // 1. Lazy-load the transporter on first use
    if (!emailTransporter) {
        emailTransporter = createTransporter();
    }
    
    // 2. Check if creation failed (due to missing ENV)
    if (!emailTransporter) {
        return { success: false, error: new Error('Mail configuration error: Transporter not initialized.') };
    }

    const SENDER_EMAIL = process.env.SENDER_EMAIL;
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
        let info = await emailTransporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('ERROR sending confirmation email:', error.message); 
        return { success: false, error };
    }
}

export {
    sendConfirmationEmail
};