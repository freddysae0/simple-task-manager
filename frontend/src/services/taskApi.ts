import axios from "axios";
import type { Task } from "../types/task";
import type { CreateTask } from "../types/task";
import type { UpdateTask } from "../types/task";

const API_BASE_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    return response.data;
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: CreateTask): Promise<Task> => {
    const response = await api.post("/tasks", task);
    return response.data;
  },

  updateTask: async (id: number, task: UpdateTask): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  getDoneTasks: async (): Promise<Task[]> => {
    const response = await api.get("/done");
    return response.data;
  },

  getPendingTasks: async (): Promise<Task[]> => {
    const response = await api.get("/pending");
    return response.data;
  },
};
