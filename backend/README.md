
# Backend API (Readme generated with AI)

Express.js REST API for the Simple Task Manager. Provides task management endpoints with SQLite database integration.

## 🚀 Features

- **RESTful API**: Clean, well-structured endpoints
- **TypeScript**: Full type safety with Zod validation
- **SQLite Database**: Persistent data storage with better-sqlite3
- **Security**: Helmet, CORS, and input validation
- **Logging**: Morgan middleware for request logging
- **Error Handling**: Comprehensive error handling middleware
- **Graceful Shutdown**: Proper cleanup on server termination

## 📁 Project Structure

```
backend/
├── src/
│   ├── api/
│   │   ├── index.ts        # API router aggregation
│   │   ├── tasks.ts        # Task CRUD operations
│   │   └── emojis.ts       # Additional endpoints
│   ├── controllers/        # Business logic controllers
│   ├── models/            # Data models and schemas
│   ├── app.ts             # Express app configuration
│   ├── database.ts        # Database connection and setup
│   ├── env.ts             # Environment variables
│   ├── middlewares.ts     # Custom middleware
│   └── index.ts           # Server entry point
├── .env.example           # Environment template
├── package.json
└── tsconfig.json
```

## 🛠️ Technologies

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **better-sqlite3**: SQLite database driver
- **Zod**: Schema validation
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger
- **Vitest**: Testing framework

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- pnpm

### Setup
```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_PATH=./tasks.db

# Optional: Database directory
DB_DIR=./
```

## 🚀 Getting Started

### Development Mode
```bash
pnpm run dev
```
The server will start at `http://localhost:3000` with hot reload.

### Production Mode
```bash
# Build the application
pnpm run build

# Start production server
pnpm start
```

### Testing
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Tasks

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/tasks` | Get all tasks | None | Array of tasks |
| GET | `/tasks/:id` | Get task by ID | None | Single task |
| POST | `/tasks` | Create new task | Task object | Created task |
| PUT | `/tasks/:id` | Update task | Partial task object | Updated task |
| DELETE | `/tasks/:id` | Delete task | None | Success message |

#### Status Filters

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pending` | Get all pending tasks |
| GET | `/done` | Get all completed tasks |

#### Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check with emoji response |

### Request/Response Formats

#### Task Object
```typescript
{
  id: number;
  title: string;
  description?: string;
  status: "pending" | "done";
  created_at: string;
  updated_at: string;
}
```

#### Create Task Request
```typescript
{
  title: string;           // Required
  description?: string;    // Optional
  status?: "pending" | "done"; // Optional, defaults to "pending"
}
```

#### Update Task Request
```typescript
{
  title?: string;
  description?: string;
  status?: "pending" | "done";
}
```

### Example Requests

#### Create a Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending"
  }'
```

#### Get All Tasks
```bash
curl http://localhost:3000/api/v1/tasks
```

#### Update a Task
```bash
curl -X PUT http://localhost:3000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done"
  }'
```

#### Delete a Task
```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/1
```

## 🗄️ Database

### Schema
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Database Operations
- **Singleton Pattern**: Single database connection instance
- **Auto-initialization**: Database and tables created automatically
- **Type Safety**: All database operations use TypeScript interfaces
- **Connection Management**: Proper connection cleanup on shutdown

## 🔧 Configuration

### Server Configuration
- **Port**: Configured via `PORT` environment variable
- **CORS**: Enabled for all origins in development
- **Security**: Helmet middleware for security headers
- **Logging**: Morgan middleware in dev mode

### Database Configuration
- **Path**: Configured via `DB_PATH` environment variable
- **Default**: `./tasks.db` in project root
- **Migration**: Automatic table creation on startup

## 🧪 Testing

### Test Structure
```
test/
├── api.test.ts     # API endpoint tests
├── app.test.ts     # Application setup tests
└── tasks.test.ts   # Task operation tests
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Test Examples
- API endpoint functionality
- Database operations
- Error handling
- Input validation

## 🔍 Debugging

### Development Tools
- **TypeScript**: Full type checking
- **ESLint**: Code linting and formatting
- **Vitest**: Unit testing framework
- **Better-sqlite3**: Database debugging

### Common Issues

**Database Connection Error**
```bash
# Check database file permissions
ls -la tasks.db

# Verify database path
echo $DB_PATH
```

**Port Already in Use**
```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 <PID>
```

**Import/Export Issues**
```bash
# Check TypeScript compilation
pnpm run build

# Verify file extensions
ls -la src/
```

## 🚀 Deployment

### Production Build
```bash
# Build TypeScript
pnpm run build

# Start production server
pnpm start
```

### Environment Setup
1. Set production environment variables
2. Ensure database file permissions
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificates
5. Configure process manager (PM2/systemd)

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 📝 Development Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Use Zod for input validation
- Implement proper error handling

### API Design
- Use RESTful conventions
- Provide meaningful error messages
- Include proper HTTP status codes
- Document all endpoints
- Validate all inputs

### Database Operations
- Use prepared statements
- Handle connection errors
- Implement proper transactions
- Use type-safe interfaces
- Handle edge cases

## 🔗 Links

- [Frontend Documentation](../frontend/README.md)
- [CLI Documentation](../cli/README.md)
- [Main Project Documentation](../README.md)
- [Express.js Documentation](https://expressjs.com/)
- [better-sqlite3 Documentation](https://github.com/JoshuaWise/better-sqlite3)