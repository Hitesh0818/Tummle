const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Now reads mail.all-inkl.com
    port: process.env.EMAIL_PORT, // Now reads 587
    // This correctly sets secure: false for port 587
    secure: process.env.EMAIL_PORT == 465, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true, 
    debug: true
});