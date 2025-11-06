import { Command } from 'commander';
import chalk from 'chalk';
import { TaskDatabase } from '../db/database';

export const toggleCommand = new Command('toggle')
  .description('Toggle task status between pending and done')
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

      const newStatus = existingTask.status === 'pending' ? 'done' : 'pending';
      const updatedTask = await db.updateTask(taskId, { status: newStatus });
      
      const statusIcon = newStatus === 'done' ? '✅' : '⏳';
      const statusText = newStatus === 'done' ? 'completed' : 'reopened';
      
      console.log(chalk.green(`${statusIcon} Task "${existingTask.title}" ${statusText}`));
      console.log(chalk.blue(`  Status: ${newStatus}`));
      console.log(chalk.gray(`  Updated: ${updatedTask!.updated_at}`));
    } catch (error) {
      console.log(chalk.red('Error toggling task:'), error);
    } finally {
      await db.close();
    }
  });
