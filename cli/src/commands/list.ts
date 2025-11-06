import { Command } from 'commander';
import chalk from 'chalk';
import { TaskDatabase } from '../db/database';

export const listCommand = new Command('list')
  .description('List all tasks')
  .option('-s, --status <status>', 'Filter by status (pending|done)')
  .action(async (options) => {
    const db = new TaskDatabase();
    
    try {
      let tasks = await db.getAllTasks();
      
      if (options.status) {
        if (!['pending', 'done'].includes(options.status)) {
          console.log(chalk.red('Error: Status must be "pending" or "done"'));
          return;
        }
        tasks = tasks.filter(task => task.status === options.status);
      }

      if (tasks.length === 0) {
        console.log(chalk.yellow('No tasks found.'));
        return;
      }

      console.log(chalk.bold('\n📋 Tasks:'));
      console.log(chalk.gray('─'.repeat(50)));
      
      tasks.forEach(task => {
        const statusIcon = task.status === 'done' ? '✅' : '⏳';
        const statusColor = task.status === 'done' ? chalk.green : chalk.yellow;
        
        console.log(`${statusIcon} ${chalk.bold(task.id)}: ${task.title}`);
        if (task.description) {
          console.log(`   ${chalk.gray(task.description)}`);
        }
        console.log(`   Status: ${statusColor(task.status)}`);
        console.log(`   ${chalk.gray(`Created: ${task.created_at}`)}`);
        console.log(chalk.gray('─'.repeat(50)));
      });
      
      console.log(chalk.blue(`\nTotal: ${tasks.length} task${tasks.length !== 1 ? 's' : ''}`));
    } catch (error) {
      console.log(chalk.red('Error listing tasks:'), error);
    } finally {
      await db.close();
    }
  });
