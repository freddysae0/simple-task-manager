import { useState } from "react";
import { Plus, Filter, ListTodo } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import type { Task } from "../types/task";
import type { UpdateTask } from "../types/task";
import type { CreateTask } from "../types/task";
import { useTasks } from "../hooks/useTasks";

export const TaskList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearError,
    getFilterLabel,
  } = useTasks();

  const handleCreateTask = async (taskData: CreateTask | UpdateTask) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData as UpdateTask);
    } else {
      await createTask(taskData as CreateTask);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Simple Task Manager</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("done")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === "done"
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Completed
              </button>
            </div>
            <span className="ml-auto text-sm text-gray-500">
              {getFilterLabel()}: {tasks.length}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
            {error}
            <button 
              onClick={clearError}
              className="ml-4 text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading tasks...</div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <ListTodo className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "all" ? "No tasks" : `No ${getFilterLabel().toLowerCase()} tasks`}
            </h3>
            <p className="text-gray-500 mb-4">
              {filter === "all" 
                ? "Create your first task to get started" 
                : `Try ${filter === "pending" ? "creating" : "completing"} some tasks`
              }
            </p>
            {filter === "all" && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create First Task
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleStatus={toggleTaskStatus}
              />
            ))}
          </div>
        )}

        {showForm && (
          <TaskForm
            task={editingTask || undefined}
            onSubmit={handleCreateTask}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
};
