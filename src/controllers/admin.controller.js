import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../config/prisma.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
    },
  });
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});