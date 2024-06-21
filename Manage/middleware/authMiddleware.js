import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { secret } from '../config/jwt.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token.split(' ')[1], secret);
        req.user = await User.findByPk(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
