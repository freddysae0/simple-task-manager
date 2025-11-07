import type { Task, CreateTask, UpdateTask } from "../../types/task";

export interface TaskFormProps {
  task?: Task;
  onSubmit: (task: CreateTask | UpdateTask) => void;
  onCancel: () => void;
}
