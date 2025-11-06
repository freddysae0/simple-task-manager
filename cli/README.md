# Task CLI

A command-line interface for managing tasks in the simple-chat project.

## Features

- Add new tasks with title, description, and status
- List all tasks or filter by status
- Update existing tasks
- Delete tasks
- Toggle task status between pending and done
- Uses the same SQLite database as the backend

## Installation

```bash
cd cli
npm install
npm run build
```

## Usage

### Add a new task
```bash
node dist/index.js add "Task title" -d "Optional description" -s pending
```

### List all tasks
```bash
node dist/index.js list
```

### List tasks by status
```bash
node dist/index.js list --status pending
node dist/index.js list --status done
```

### Update a task
```bash
node dist/index.js update <id> -t "New title" -d "New description" -s done
```

### Delete a task
```bash
node dist/index.js delete <id>
```

### Toggle task status
```bash
node dist/index.js toggle <id>
```

### Get help
```bash
node dist/index.js --help
node dist/index.js <command> --help
```

## Development

### Run in development mode
```bash
npm run dev -- <command>
```

### Build
```bash
npm run build
```

## Database

The CLI uses the same SQLite database as the backend (`backend/tasks.db`). All changes made through the CLI will be reflected in the web application and vice versa.

## Examples

```bash
# Add a task
node dist/index.js add "Buy groceries" -d "Milk, eggs, bread"

# List pending tasks
node dist/index.js list --status pending

# Mark task as done
node dist/index.js toggle 1

# Update task
node dist/index.js update 1 -t "Buy groceries and more" -d "Milk, eggs, bread, cheese"

# Delete task
node dist/index.js delete 1
```
