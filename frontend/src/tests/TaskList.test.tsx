import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskList } from '../components/TaskList';
import { taskApi } from '../services/taskApi';
import { TaskStatus } from '../types/task';
import { vi, beforeEach, describe, test, expect } from 'vitest';

// Mock the taskApi
vi.mock('../services/taskApi');
const mockedTaskApi = taskApi as any;

describe('TaskList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders task manager title', async () => {
    mockedTaskApi.getAllTasks.mockResolvedValue([]);

    render(<TaskList />);
    
    expect(screen.getByText('Simple Task Manager')).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    mockedTaskApi.getAllTasks.mockImplementation(() => new Promise(() => {}));

    render(<TaskList />);
    
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  test('displays tasks when loaded', async () => {
    const mockTasks = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.PENDING,
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z',
      },
    ];
    mockedTaskApi.getAllTasks.mockResolvedValue(mockTasks);

    render(<TaskList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  test('opens new task form when button is clicked', async () => {
    mockedTaskApi.getAllTasks.mockResolvedValue([]);

    render(<TaskList />);
    
    const newTaskButton = screen.getByRole('button', { name: 'New Task' });
    fireEvent.click(newTaskButton);
    
    expect(screen.getAllByText('New Task')).toHaveLength(2);
    expect(screen.getByText('Title *')).toBeInTheDocument();
  });
});
