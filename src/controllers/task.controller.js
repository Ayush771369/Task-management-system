import asyncHandler from "../utils/asyncHandler.js";
import * as taskService from "../services/task.service.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getTasks(req.user.id);

  res.status(200).json({
    success: true,
    data: tasks,
  });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(
    req.params.id,
    req.user.id
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.user.id,
    req.body
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await taskService.deleteTask(
    req.params.id,
    req.user.id
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});