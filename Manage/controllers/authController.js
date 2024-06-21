import User from '../models/userModel.js';
import { hashPassword, verifyPassword } from '../utils/hashPassword.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { sendOtp } from '../utils/sendOtp.js';

export const signUp = async (req, res) => {
    const { email, username, password, confirmPassword, role, firstName, lastName } = req.body;

    // Foydalanuvchi kiritgan ma'lumot database - dagi ma'lumot bilan mos kelishini tekshirish uchun
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Parolni xeshlash uchun quyidagicha yo'l tutamiz
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ email, username, password: hashedPassword, role, firstName, lastName });

        const otp = await sendOtp(email);
      // Bu yerda, OTPni foydalanuvchi modeliga yoki alohida OTP modeliga saqlab olishimiz maqsadga muvofiq bo'ladi!

        res.status(201).json({ message: "User created", userId: user.id, otpSent: true });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    const { userId, otp } = req.body;

    // Bu erda siz OTPni ma'lumotlar bazasida saqlangan bilan tekshirishingiz kerak

    try {
        const user = await User.findByPk(userId);
        user.status = 'active';
        await user.save();
        res.status(200).json({ message: "OTP verified, account activated" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error: error.message });
    }
};

export const getCurrentUser = (req, res) => {
    const user = req.user;
    res.status(200).json(user);
};

export const logout = (req, res) => {
    // Agar kerak bo'lsa, chiqish mantig'ini boshqaring (masalan, yangilash tokenlarini bekor qilish)
    res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findByPk(decoded.id);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(500).json({ message: "Error refreshing token", error: error.message });
    }
};
