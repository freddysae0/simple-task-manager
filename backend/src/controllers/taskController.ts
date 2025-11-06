import type { Request, Response } from "express";
import { db } from "../database.js";
import { CreateTaskSchema, TaskStatus, UpdateTaskSchema } from "../models/task.js";

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = db.getDb().prepare("SELECT * FROM tasks ORDER BY created_at DESC").all();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = db.getDb().prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = CreateTaskSchema.parse(req.body);
    
    const result = db.getDb().prepare(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)"
    ).run(validatedData.title, validatedData.description || null, validatedData.status);
    
    const newTask = db.getDb().prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({ error: "Invalid input data" });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateTaskSchema.parse(req.body);
    
    const existingTask = db.getDb().prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    const updateFields = [];
    const updateValues = [];
    
    if (validatedData.title !== undefined) {
      updateFields.push("title = ?");
      updateValues.push(validatedData.title);
    }
    if (validatedData.description !== undefined) {
      updateFields.push("description = ?");
      updateValues.push(validatedData.description);
    }
    if (validatedData.status !== undefined) {
      updateFields.push("status = ?");
      updateValues.push(validatedData.status);
    }
    
    updateFields.push("updated_at = CURRENT_TIMESTAMP");
    updateValues.push(id);
    
    db.getDb().prepare(
      `UPDATE tasks SET ${updateFields.join(", ")} WHERE id = ?`
    ).run(...updateValues);
    
    const updatedTask = db.getDb().prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    res.json(updatedTask);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({ error: "Invalid input data" });
    }
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingTask = db.getDb().prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    db.getDb().prepare("DELETE FROM tasks WHERE id = ?").run(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const getDoneTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = db.getDb().prepare("SELECT * FROM tasks WHERE status = ? ORDER BY updated_at DESC").all(TaskStatus.DONE);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch done tasks" });
  }
};

export const getPendingTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = db.getDb().prepare("SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC").all(TaskStatus.PENDING);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pending tasks" });
  }
};
