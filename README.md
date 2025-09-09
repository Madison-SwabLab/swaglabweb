# SwagLab.ai Frontend

AI-Powered Merch Design at Scale - Frontend Application

## 🚀 Overview

SwagLab.ai is a sophisticated application that analyzes websites, extracts brand information, and generates custom designs and apparel visualizations using AI services. This frontend application provides a modern, responsive interface for managing AI-powered merch design jobs and collections.

## ✨ Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Zustand for lightweight state management
- **API Integration**: Comprehensive API client with automatic token refresh
- **Authentication**: JWT-based authentication with persistent sessions
- **Real-time Updates**: Job progress tracking and status updates
- **Type Safety**: Full TypeScript coverage with strict type checking
- **Performance**: Optimized with React Query for data fetching and caching

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout component
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Authentication
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── JobDetailPage.tsx
│   └── DesignPage.tsx
├── services/           # API and external services
│   └── apiClient.ts    # API client with authentication
├── store/              # State management
│   ├── authStore.ts    # Authentication state
│   └── jobStore.ts     # Job management state
├── types/              # TypeScript type definitions
│   ├── api.ts          # API types and interfaces
│   ├── entities.ts     # Domain entities and classes
│   └── enums.ts        # Enumerations and constants
├── utils/              # Utility functions
│   ├── cn.ts           # Class name utility
│   ├── colorUtils.ts   # Color manipulation utilities
│   ├── imageUtils.ts   # Image processing utilities
│   └── validationUtils.ts # Form validation utilities
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swaglab-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:7222/api
   VITE_APP_NAME=SwagLab.ai
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### API Configuration

The API client is configured in `src/services/apiClient.ts`. Update the base URL to point to your backend API:

```typescript
const apiClient = new ApiClient('https://your-api-domain.com/api');
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          // Your brand colors
        }
      }
    }
  }
}
```

## 🎨 Design System

The application uses a comprehensive design system built on Tailwind CSS:

- **Colors**: Brand-specific color palette with semantic naming
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component patterns
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Authentication

The application implements JWT-based authentication with:

- **Automatic token refresh**: Seamless user experience
- **Persistent sessions**: Login state preserved across browser sessions
- **Route protection**: Automatic redirects for unauthenticated users
- **Error handling**: Comprehensive error states and user feedback

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for mobile devices
- **Breakpoints**: Consistent breakpoint system
- **Touch-friendly**: Optimized for touch interactions
- **Accessibility**: WCAG 2.1 AA compliant

## 🧪 Testing

Testing setup includes:

- **Unit tests**: Component and utility testing
- **Integration tests**: API integration testing
- **E2E tests**: Full user journey testing
- **Type checking**: TypeScript strict mode

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Set the following environment variables for production:

```env
VITE_API_BASE_URL=https://api.swaglab.ai/api
VITE_APP_NAME=SwagLab.ai
```

### Static Hosting

The application can be deployed to any static hosting service:

- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **AWS S3**: Static website hosting
- **Azure Static Web Apps**: Integrated CI/CD

## 📖 API Integration

The frontend integrates with a comprehensive REST API:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

### Job Management
- `GET /api/jobs` - List user jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/{id}` - Get job details
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

### Design Management
- `GET /api/jobs/{jobId}/designs` - List job designs
- `POST /api/jobs/{jobId}/designs` - Create design
- `GET /api/designs/{id}` - Get design details
- `PUT /api/designs/{id}` - Update design
- `DELETE /api/designs/{id}` - Delete design

## 🔄 State Management

The application uses Zustand for state management:

### Auth Store
- User authentication state
- Login/logout actions
- Token management
- Persistent storage

### Job Store
- Job list management
- Job detail state
- Filtering and pagination
- Real-time updates

## 🎯 Key Features

### Dashboard
- Job overview and statistics
- Quick actions and navigation
- Real-time status updates
- Responsive grid layout

### Job Management
- Create and configure jobs
- Real-time progress tracking
- Status management
- Error handling

### Design Gallery
- AI-generated design previews
- Design management tools
- Export functionality
- Collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- **Documentation**: Check the `/docs` folder
- **Issues**: Create a GitHub issue
- **Email**: support@swaglab.ai

## 🔗 Related Projects

- **Backend API**: [SwagLab Backend](../swaglab-backend)
- **Documentation**: [API Documentation](../docs)
- **Design System**: [Figma Design System](https://figma.com/swaglab)

---

**Built with ❤️ by the SwagLab.ai team**
