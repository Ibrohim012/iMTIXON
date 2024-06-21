import bcrypt from 'bcryptjs';

export const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
