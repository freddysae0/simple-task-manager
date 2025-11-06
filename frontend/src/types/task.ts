export const TaskStatus = {
  PENDING: "pending",
  DONE: "done"
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateTask {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
