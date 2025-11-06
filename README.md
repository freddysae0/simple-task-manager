# Simple Task Manager (Readme generated with AI)

A modern / simple full-stack task management application with web interface and command-line tool. Built with TypeScript, React, Node.js, and SQLite.

## 🚀 Features

### Web Application
- **Task Management**: Create, read, update, and delete tasks
- **Status Tracking**: Mark tasks as pending or done
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Real-time Updates**: Instant synchronization across all interfaces
- **Type Safety**: Fully typed with TypeScript

### Command-Line Interface
- **CLI Operations**: Complete task management from terminal
- **Batch Operations**: Efficient bulk task operations
- **Colored Output**: Beautiful terminal output with chalk
- **Global Installation**: Available as system-wide command

### Shared Infrastructure
- **Unified Database**: Single SQLite database shared across all interfaces
- **RESTful API**: Clean, well-documented backend API
- **Data Synchronization**: Real-time sync between web and CLI

## 📁 Project Structure

```
task-manager/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── api/            # API routes and handlers
│   │   ├── controllers/    # Business logic controllers
│   │   ├── models/         # Data models and schemas
│   │   ├── database.ts     # SQLite database configuration
│   │   ├── env.ts          # Environment variables
│   │   └── index.ts        # Server entry point
│   └── package.json
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   └── package.json
├── cli/                    # Command-line interface
│   ├── src/
│   │   ├── commands/       # CLI command implementations
│   │   ├── db/            # Database operations
│   │   ├── types/         # Shared type definitions
│   │   └── index.ts       # CLI entry point
│   └── package.json
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **SQLite**: Database engine
- **Zod**: Schema validation
- **Vitest**: Testing framework

### Frontend
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **Vitest**: Testing framework

### CLI
- **TypeScript**: Type-safe JavaScript
- **Commander.js**: Command-line framework
- **Chalk**: Terminal styling
- **SQLite3**: Database driver

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended package manager)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd simple-chat
```

2. **Install dependencies**
```bash
# Backend dependencies
cd backend
pnpm install

# Frontend dependencies
cd ../frontend
pnpm install

# CLI dependencies
cd ../cli
pnpm install
```

3. **Environment setup**
```bash
# Copy environment template
cd ../backend
cp .env.example .env

# Edit .env with your configuration
```

## 🚀 Getting Started

### Development Mode

1. **Start the backend server**
```bash
cd backend
pnpm run dev
```
The API will be available at `http://localhost:3000`

2. **Start the frontend application**
```bash
cd frontend
pnpm run dev
```
The web app will be available at `http://localhost:5173`

3. **Build and use the CLI**
```bash
cd cli
pnpm run build
pnpm link  # Optional: make available globally
```

### Production Mode

1. **Build the backend**
```bash
cd backend
pnpm run build
pnpm start
```

2. **Build the frontend**
```bash
cd frontend
pnpm run build
pnpm preview
```

3. **Use the CLI**
```bash
cd cli
pnpm start
```

## 📚 Usage

### Web Application
Access the web interface at `http://localhost:5173` and use the intuitive UI to:
- Add new tasks with title and description
- Mark tasks as complete or pending
- Edit existing tasks
- Delete tasks
- Filter tasks by status

### Command-Line Interface

```bash
# Add a new task
task-cli add "Buy groceries" -d "Milk, eggs, bread"

# List all tasks
task-cli list

# List pending tasks
task-cli list --status pending

# Update a task
task-cli update 1 -t "New title" -d "New description"

# Toggle task status
task-cli toggle 1

# Delete a task
task-cli delete 1
```

### API Endpoints

The backend provides RESTful API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🗄️ Database

The application uses SQLite for data persistence:
- **Location**: `backend/tasks.db`
- **Schema**: Tasks table with id, title, description, status, created_at, updated_at
- **Synchronization**: All interfaces share the same database for real-time consistency

## 🧪 Testing

### Backend Tests
```bash
cd backend
pnpm test
```

### Frontend Tests
```bash
cd frontend
pnpm test
```

### CLI Tests
```bash
cd cli
pnpm test
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=3000
DATABASE_PATH=./tasks.db
```

### Customization
- **Frontend**: Modify `frontend/src/index.css` for styling changes
- **Backend**: Update `backend/src/env.ts` for environment configuration
- **CLI**: Customize commands in `cli/src/commands/`

## 🚀 Deployment

### Backend Deployment
1. Build the application: `pnpm run build`
2. Set production environment variables
3. Start with: `pnpm start`

### Frontend Deployment
1. Build the application: `pnpm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure API endpoint to point to your backend

### CLI Distribution
1. Build the CLI: `pnpm run build`
2. Publish to npm or distribute the binary
3. Users can install with: `pnpm add -g your-package`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `pnpm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a pull request

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use meaningful variable and function names
- Write tests for new features
- Keep the codebase clean and organized
- Follow the existing project structure
- Use pnpm for package management

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process using the port
lsof -ti:3000 | xargs kill -9
```

**Database connection error**
- Ensure the database file exists
- Check file permissions
- Verify the database path in environment variables

**Build errors**
- Clear node_modules: `pnpm clean` or `rm -rf node_modules`
- Reinstall dependencies: `pnpm install`
- Check TypeScript configuration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [CLI Documentation](./cli/README.md)
- [API Documentation](./backend/docs/api.md)
