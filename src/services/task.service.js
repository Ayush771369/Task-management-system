import prisma from "../config/prisma.js";

export const createTask = async (data) => {
  return prisma.task.create({
    data,
  });
};

export const getTasks = async (userId) => {
  return prisma.task.findMany({
    where: {
      userId,
    },
  });
};

export const getTaskById = async (taskId, userId) => {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
};

export const updateTask = async (taskId, userId, updates) => {
  const task = await getTaskById(taskId, userId);

  if (!task) return null;

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: updates,
  });
};

export const deleteTask = async (taskId, userId) => {
  const task = await getTaskById(taskId, userId);

  if (!task) return null;

  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};