import { Command } from 'commander';
import chalk from 'chalk';
import { TaskDatabase } from '../db/database';
import { CreateTask } from '../types/task';

export const addCommand = new Command('add')
  .description('Add a new task')
  .argument('<title>', 'Task title')
  .option('-d, --description <description>', 'Task description')
  .option('-s, --status <status>', 'Task status (pending|done)', 'pending')
  .action(async (title: string, options) => {
    const db = new TaskDatabase();
    
    try {
      if (options.status && !['pending', 'done'].includes(options.status)) {
        console.log(chalk.red('Error: Status must be "pending" or "done"'));
        return;
      }

      const taskData: CreateTask = {
        title,
        description: options.description,
        status: options.status as 'pending' | 'done'
      };

      const task = await db.createTask(taskData);
      
      console.log(chalk.green('✓ Task added successfully:'));
      console.log(chalk.blue(`  ID: ${task.id}`));
      console.log(chalk.blue(`  Title: ${task.title}`));
      if (task.description) {
        console.log(chalk.blue(`  Description: ${task.description}`));
      }
      console.log(chalk.blue(`  Status: ${task.status}`));
      console.log(chalk.gray(`  Created: ${task.created_at}`));
    } catch (error) {
      console.log(chalk.red('Error adding task:'), error);
    } finally {
      await db.close();
    }
  });
