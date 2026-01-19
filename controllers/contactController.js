const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.saveContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save to Database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Email Notification
        let transporter;
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
        } else {
            // Fallback for development/demo: Create a test account on Ethereal
            console.warn('Real email credentials not set. Creating a mock test account.');
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'demo@wiredhustle.com',
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER || 'admin@wiredhustle.com',
            subject: `New Contact Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        if (transporter.options.host === 'smtp.ethereal.email') {
            console.log('Mock Email Preview URL: %s', nodemailer.getTestMessageUrl(info));
        } else {
            console.log('Real Email sent successfully');
        }

        res.status(201).json({ message: 'Contact message saved successfully' });
    } catch (err) {
        console.error('Error in saveContact:', err);
        res.status(400).json({ message: err.message });
    }
};
