export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'done';
  created_at: string;
  updated_at: string;
}

export interface CreateTask {
  title: string;
  description?: string;
  status?: 'pending' | 'done';
}

export interface UpdateTask {
  title?: string;
  description?: string;
  status?: 'pending' | 'done';
}
