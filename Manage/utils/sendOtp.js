import nodemailer from 'nodemailer';

export const sendOtp = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return otp;
    } catch (error) {
        throw new Error('Error sending OTP');
    }
};
