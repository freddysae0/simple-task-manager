#!/usr/bin/env node

import { Command } from 'commander';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';
import { updateCommand } from './commands/update';
import { deleteCommand } from './commands/delete';
import { toggleCommand } from './commands/toggle';

const program = new Command();

program
  .name('task-cli')
  .description('CLI for managing tasks')
  .version('1.0.0');

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(updateCommand);
program.addCommand(deleteCommand);
program.addCommand(toggleCommand);

program.parse();
