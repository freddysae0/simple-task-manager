import { useState } from "react";
import { Edit2, Trash2, CheckCircle, Circle } from "lucide-react";
import { TaskStatus } from "../../types/task";
import type { TaskItemProps } from "./types";

export const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(task);
  };

  const handleToggleStatus = () => {
    onToggleStatus(task);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-4 transition-all duration-200 ${
        isDeleting ? "opacity-50 scale-95" : "hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleStatus}
          className="mt-1 flex-shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
          disabled={isDeleting}
        >
          {task.status === TaskStatus.DONE ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-gray-900 ${
              task.status === TaskStatus.DONE ? "line-through opacity-60" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`text-sm text-gray-600 mt-1 ${
                task.status === TaskStatus.DONE ? "line-through opacity-50" : ""
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.status === TaskStatus.DONE
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {task.status === TaskStatus.DONE ? "Completed" : "Pending"}
            </span>
            <span>Created: {formatDate(task.created_at)}</span>
            {task.updated_at !== task.created_at && (
              <span>Updated: {formatDate(task.updated_at)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            disabled={isDeleting}
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            disabled={isDeleting}
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
