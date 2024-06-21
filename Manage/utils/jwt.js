import jwt from 'jsonwebtoken';
import { secret, refreshSecret, expiresIn, refreshExpiresIn } from '../config/jwt.js';

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, refreshSecret, { expiresIn: refreshExpiresIn });
};
