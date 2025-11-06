import { useState, useEffect, useCallback } from "react";
import { TaskStatus } from "../types/task";
import type { Task } from "../types/task";
import type { UpdateTask } from "../types/task";
import type { CreateTask } from "../types/task";
import { taskApi } from "../services/taskApi";

type FilterType = "all" | "pending" | "done";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let tasksData: Task[];
      switch (filter) {
        case "pending":
          tasksData = await taskApi.getPendingTasks();
          break;
        case "done":
          tasksData = await taskApi.getDoneTasks();
          break;
        default:
          tasksData = await taskApi.getAllTasks();
      }
      
      setTasks(tasksData);
    } catch (err) {
      setError("Error loading tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const createTask = useCallback(async (taskData: CreateTask) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError("Error creating task");
      console.error("Error creating task:", err);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: number, taskData: UpdateTask) => {
    try {
      const updatedTask = await taskApi.updateTask(id, taskData);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError("Error updating task");
      console.error("Error updating task:", err);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (task: Task) => {
    try {
      await taskApi.deleteTask(task.id);
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (err) {
      setError("Error deleting task");
      console.error("Error deleting task:", err);
      throw err;
    }
  }, []);

  const toggleTaskStatus = useCallback(async (task: Task) => {
    try {
      const newStatus = task.status === TaskStatus.DONE ? TaskStatus.PENDING : TaskStatus.DONE;
      const updatedTask = await taskApi.updateTask(task.id, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError("Error toggling task status");
      console.error("Error toggling task status:", err);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = tasks;

  const getFilterLabel = () => {
    switch (filter) {
      case "pending":
        return "Pending";
      case "done":
        return "Completed";
      default:
        return "All";
    }
  };

  return {
    tasks: filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearError,
    refreshTasks: loadTasks,
    getFilterLabel,
  };
};
