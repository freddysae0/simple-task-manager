# Frontend Web Application (Readme generated with AI)

React-based web interface for the Simple Task Manager. Provides a modern, responsive UI for task management with real-time synchronization.

## 🚀 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Task Management**: Complete CRUD operations for tasks
- **Real-time Updates**: Instant synchronization with backend
- **Status Filtering**: Filter tasks by status (all/pending/completed)
- **Interactive Forms**: Modal forms for creating and editing tasks
- **Error Handling**: User-friendly error messages and notifications
- **Loading States**: Smooth loading indicators and skeleton screens
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Modular, reusable React components

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskList.tsx    # Main task list component
│   │   ├── TaskItem.tsx    # Individual task component
│   │   └── TaskForm.tsx    # Task creation/editing form
│   ├── hooks/
│   │   └── useTasks.ts     # Custom task management hook
│   ├── services/
│   │   └── api.ts          # API service layer
│   ├── types/
│   │   └── task.ts         # TypeScript type definitions
│   ├── tests/
│   │   └── TaskList.test.tsx # Component tests
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Technologies

- **React 19**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icon library
- **Vitest**: Testing framework
- **Testing Library**: React component testing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- pnpm

### Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🚀 Getting Started

### Development Mode
```bash
pnpm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Testing
```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests in watch mode
pnpm test:watch
```

### Code Quality
```bash
# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint:fix
```

## 🎨 UI Components

### TaskList
The main component that manages the entire task interface:

**Features:**
- Displays all tasks with filtering options
- Handles task creation, editing, and deletion
- Shows loading states and error messages
- Responsive design for all screen sizes

**Props:**
None (self-contained component)

**State Management:**
- Uses `useTasks` hook for data management
- Local state for UI interactions (form visibility, editing)

### TaskItem
Individual task component with interactive features:

**Features:**
- Displays task information with status indicators
- Toggle task completion status
- Edit and delete task actions
- Smooth animations and transitions

**Props:**
```typescript
interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}
```

### TaskForm
Modal form for creating and editing tasks:

**Features:**
- Form validation and error handling
- Support for both create and edit modes
- Accessible form controls
- Smooth modal animations

**Props:**
```typescript
interface TaskFormProps {
  task?: Task;
  onSubmit: (task: CreateTask | UpdateTask) => void;
  onCancel: () => void;
}
```

## 🎯 User Interface

### Main Layout
- **Header**: Application title and "New Task" button
- **Filter Bar**: Status filter buttons (All/Pending/Completed)
- **Task List**: Scrollable list of task items
- **Empty States**: Helpful messages when no tasks exist
- **Error Messages**: Inline error notifications with dismiss action

### Visual Design
- **Color Scheme**: Blue primary, semantic colors for status
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent padding and margins
- **Icons**: Lucide React icons for visual clarity
- **Responsive**: Mobile-first design approach

### Interactions
- **Hover States**: Visual feedback on interactive elements
- **Loading Indicators**: Spinners and skeleton screens
- **Transitions**: Smooth animations for state changes
- **Modal Overlays**: Focus management and backdrop blur

## 🔧 Configuration

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
```

### TypeScript Configuration
- Strict type checking enabled
- Path aliases for clean imports
- React types configured
- Build targets optimized for modern browsers

## 📊 State Management

### useTasks Hook
Custom hook that encapsulates all task-related logic:

**Features:**
- API request handling
- Local state management
- Error handling and recovery
- Loading state management
- Filter functionality

**Usage:**
```typescript
const {
  tasks,
  loading,
  error,
  filter,
  setFilter,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  clearError,
  getFilterLabel,
} = useTasks();
```

### Data Flow
1. **Component** calls hook methods
2. **Hook** manages API requests via service layer
3. **Service** handles HTTP communication
4. **Component** updates based on hook state changes

## 🌐 API Integration

### Service Layer
The `api.ts` file handles all HTTP requests:

**Features:**
- Axios HTTP client configuration
- Request/response interceptors
- Error handling and retry logic
- Type-safe API methods

**Methods:**
```typescript
// Task CRUD operations
getTasks(): Promise<Task[]>
getTaskById(id: number): Promise<Task>
createTask(task: CreateTask): Promise<Task>
updateTask(id: number, task: UpdateTask): Promise<Task>
deleteTask(id: number): Promise<void>
```

### Error Handling
- Network error detection
- API error response parsing
- User-friendly error messages
- Automatic retry for failed requests
- Graceful degradation

## 🧪 Testing

### Test Structure
```
src/tests/
├── TaskList.test.tsx    # Main component tests
├── TaskItem.test.tsx    # Task item tests
├── TaskForm.test.tsx    # Form component tests
└── useTasks.test.ts     # Hook tests
```

### Testing Approach
- **Component Testing**: React Testing Library for UI testing
- **Hook Testing**: Custom hook testing with renderHook
- **API Mocking**: Mock service layer for isolated testing
- **User Interactions**: Simulate real user behavior
- **Accessibility**: Screen reader and keyboard navigation

### Example Test
```typescript
test('should create a new task', async () => {
  const mockCreateTask = jest.fn();
  render(<TaskList />);
  
  fireEvent.click(screen.getByText('New Task'));
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: 'Test Task' }
  });
  fireEvent.click(screen.getByText('Create Task'));
  
  await waitFor(() => {
    expect(mockCreateTask).toHaveBeenCalledWith({
      title: 'Test Task',
      status: 'pending'
    });
  });
});
```

## 🎨 Styling

### Tailwind CSS Usage
- **Utility Classes**: Rapid styling without custom CSS
- **Responsive Design**: Mobile-first breakpoints
- **Component Variants**: Consistent design patterns
- **Dark Mode Support**: Prepared for theme switching

### Custom Styles
- **Global Styles**: Base styles in `index.css`
- **Component Styles**: Tailwind utilities in components
- **Animation Classes**: Custom transitions and animations
- **Accessibility**: Focus states and screen reader support

## 🚀 Deployment

### Build Process
```bash
# Production build
pnpm run build

# Output: dist/ folder
# - Optimized JavaScript and CSS
# - Asset optimization
# - Source maps for debugging
```

### Static Hosting
The build output can be deployed to any static hosting service:
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment
- **GitHub Pages**: Free hosting for projects
- **AWS S3**: Cloud storage with CloudFront

### Environment Configuration
```typescript
// API endpoint configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
```

## 🔍 Development Tools

### Browser DevTools
- **React Developer Tools**: Component inspection
- **Redux DevTools**: State debugging (if needed)
- **Network Tab**: API request monitoring
- **Console**: Error logging and debugging

### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

## 📝 Development Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow React hooks best practices
- Implement proper error boundaries
- Use semantic HTML elements
- Follow accessibility guidelines

### Component Design
- Single responsibility principle
- Reusable and composable components
- Props interface documentation
- Consistent naming conventions
- Proper state management

### Performance Optimization
- React.memo for expensive components
- useMemo and useCallback for optimization
- Code splitting with lazy loading
- Image optimization and lazy loading
- Bundle size optimization

## 🔗 Links

- [Backend API Documentation](../backend/README.md)
- [CLI Documentation](../cli/README.md)
- [Main Project Documentation](../README.md)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vite.dev/)
