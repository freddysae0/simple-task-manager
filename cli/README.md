# Task CLI

A powerful command-line interface for managing tasks in the simple-chat project. Built with TypeScript and Commander.js, this CLI provides a fast and efficient way to manage your tasks directly from the terminal.

## 🚀 Features

- **Add Tasks**: Create new tasks with title, description, and status
- **List Tasks**: View all tasks or filter by status (pending/done)
- **Update Tasks**: Modify existing task properties
- **Delete Tasks**: Remove tasks from the database
- **Toggle Status**: Quickly switch between pending and done states
- **Database Integration**: Uses SQLite database shared with the web backend
- **Colored Output**: Beautiful, readable terminal output with chalk
- **Type Safety**: Fully typed with TypeScript

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- pnpm

### Setup
```bash
# Navigate to the CLI directory
cd cli

# Install dependencies
pnpm install

# Build the project
pnpm run build

# (Optional) Make it available globally
pnpm link
```

## 🛠️ Usage

### Basic Commands

#### Add a new task
```bash
task-cli add "Buy groceries" -d "Milk, eggs, bread"
task-cli add "Complete project" -s done
```

#### List all tasks
```bash
task-cli list
```

#### List tasks by status
```bash
task-cli list --status pending
task-cli list --status done
```

#### Update a task
```bash
task-cli update 1 -t "New title" -d "New description" -s done
```

#### Delete a task
```bash
task-cli delete 1
```

#### Toggle task status
```bash
task-cli toggle 1
```

### Help & Information
```bash
# Show general help
task-cli --help

# Show command-specific help
task-cli add --help
task-cli list --help
```

## 🗄️ Database

The CLI uses SQLite for data persistence, sharing the same database as the web backend:

- **Location**: `../backend/tasks.db`
- **Synchronization**: All changes made through the CLI are immediately reflected in the web application
- **Schema**: Tasks table with id, title, description, status, created_at, and updated_at fields

## 🎯 Examples

### Daily Workflow
```bash
# Add morning tasks
task-cli add "Review emails" -d "Check and respond to important emails"
task-cli add "Team standup" -d "Daily sync with the team"

# List pending tasks
task-cli list --status pending

# Mark task as completed
task-cli toggle 1

# Update task details
task-cli update 2 -t "Team standup - discuss project timeline"

# Clean up completed tasks
task-cli delete 1
```

### Project Management
```bash
# Create project tasks
task-cli add "Design database schema" -d "Create ERD and SQL scripts"
task-cli add "Implement authentication" -s pending
task-cli add "Write unit tests" -s pending

# View all project tasks
task-cli list

# Update task status
task-cli update 1 -s done
task-cli toggle 2
```

## 🔧 Development

### Development Scripts
```bash
# Run in development mode (with ts-node)
pnpm run dev -- <command>

# Build for production
pnpm run build

# Start production build
pnpm start
```

### Project Structure
```
cli/
├── src/
│   ├── commands/          # CLI command implementations
│   │   ├── add.ts         # Add task command
│   │   ├── delete.ts      # Delete task command
│   │   ├── list.ts        # List tasks command
│   │   ├── toggle.ts      # Toggle status command
│   │   └── update.ts      # Update task command
│   ├── db/
│   │   └── database.ts    # Database connection and operations
│   ├── types/
│   │   └── task.ts        # TypeScript type definitions
│   └── index.ts           # Main CLI entry point
├── dist/                  # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

### Technologies Used
- **TypeScript**: Type-safe JavaScript
- **Commander.js**: Command-line framework
- **Chalk**: Terminal string styling
- **SQLite3**: Database engine
- **ts-node**: TypeScript execution

## 📋 Command Reference

| Command | Arguments | Options | Description |
|---------|-----------|---------|-------------|
| `add` | `<title>` | `-d, --description <desc>`<br>`-s, --status <status>` | Add a new task |
| `list` | None | `-s, --status <status>` | List tasks (optionally filtered) |
| `update` | `<id>` | `-t, --title <title>`<br>`-d, --description <desc>`<br>`-s, --status <status>` | Update existing task |
| `delete` | `<id>` | None | Delete a task |
| `toggle` | `<id>` | None | Toggle task status |

### Status Values
- `pending`: Task is not yet completed
- `done`: Task has been completed

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module" error**
```bash
# Rebuild the project
pnpm run build
```

**Database connection error**
- Ensure the backend database exists at `../backend/tasks.db`
- Check that you have proper file permissions

**Permission denied on global install**
```bash
# Use pnpm dlx instead of global install
pnpm dlx task-cli <command>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Build and test the changes
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
