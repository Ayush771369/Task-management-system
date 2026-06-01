import prisma from '../config/prisma.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from '../utils/ApiError.js';

export const registerUser = async (data) => {
    const { name, email, password } = data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return user;
};

export const loginUser = async (data) => {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(400, 'Invalid password');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { 
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
    };
};