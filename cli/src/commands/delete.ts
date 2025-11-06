import { Command } from 'commander';
import chalk from 'chalk';
import { TaskDatabase } from '../db/database';

export const deleteCommand = new Command('delete')
  .description('Delete a task')
  .argument('<id>', 'Task ID')
  .action(async (id: string) => {
    const db = new TaskDatabase();
    
    try {
      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        console.log(chalk.red('Error: Invalid task ID'));
        return;
      }

      const existingTask = await db.getTaskById(taskId);
      if (!existingTask) {
        console.log(chalk.red(`Error: Task with ID ${taskId} not found`));
        return;
      }

      const deleted = await db.deleteTask(taskId);
      
      if (deleted) {
        console.log(chalk.green(`✓ Task "${existingTask.title}" (ID: ${taskId}) deleted successfully`));
      } else {
        console.log(chalk.red(`Error: Failed to delete task with ID ${taskId}`));
      }
    } catch (error) {
      console.log(chalk.red('Error deleting task:'), error);
    } finally {
      await db.close();
    }
  });
