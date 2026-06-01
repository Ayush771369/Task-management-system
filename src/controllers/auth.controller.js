import ayncHandler from '../utils/asyncHandler.js';
import { registerUser, loginUser } from '../services/auth.services.js';

export const register = ayncHandler(async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});

export const login = ayncHandler(async (req, res) => {
    const result = await loginUser(req.body);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result,
    });
});