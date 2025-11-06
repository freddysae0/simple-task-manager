import { z } from "zod";

export enum TaskStatus {
  PENDING = "pending",
  DONE = "done"
}

export const TaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export const CreateTaskSchema = TaskSchema.omit({ id: true, created_at: true, updated_at: true });
export const UpdateTaskSchema = CreateTaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
