import { Command } from 'commander';
import chalk from 'chalk';
import { TaskDatabase } from '../db/database';
import { UpdateTask } from '../types/task';

export const updateCommand = new Command('update')
  .description('Update a task')
  .argument('<id>', 'Task ID')
  .option('-t, --title <title>', 'New title')
  .option('-d, --description <description>', 'New description')
  .option('-s, --status <status>', 'New status (pending|done)')
  .action(async (id: string, options) => {
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

      if (options.status && !['pending', 'done'].includes(options.status)) {
        console.log(chalk.red('Error: Status must be "pending" or "done"'));
        return;
      }

      const updates: UpdateTask = {};
      if (options.title !== undefined) updates.title = options.title;
      if (options.description !== undefined) updates.description = options.description;
      if (options.status !== undefined) updates.status = options.status as 'pending' | 'done';

      const updatedTask = await db.updateTask(taskId, updates);
      
      console.log(chalk.green('✓ Task updated successfully:'));
      console.log(chalk.blue(`  ID: ${updatedTask!.id}`));
      console.log(chalk.blue(`  Title: ${updatedTask!.title}`));
      if (updatedTask!.description) {
        console.log(chalk.blue(`  Description: ${updatedTask!.description}`));
      }
      console.log(chalk.blue(`  Status: ${updatedTask!.status}`));
      console.log(chalk.gray(`  Updated: ${updatedTask!.updated_at}`));
    } catch (error) {
      console.log(chalk.red('Error updating task:'), error);
    } finally {
      await db.close();
    }
  });
