# System Architecture Design

## Overview
This document outlines the architecture for the SwagLab.ai application, designed as a scalable, maintainable system with separate frontend and backend components.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React/Vue)   │◄──►│   (.NET Core)   │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  External APIs  │
                       │  (AI Services)  │
                       └─────────────────┘
```

## Backend Architecture

### 1. Project Structure
```
URLImageGenerator.Backend/
├── src/
│   ├── URLImageGenerator.API/           # Web API layer
│   ├── URLImageGenerator.Core/          # Business logic & entities
│   ├── URLImageGenerator.Infrastructure/ # Data access & external services
│   └── URLImageGenerator.Shared/        # Shared utilities
├── tests/
│   ├── URLImageGenerator.UnitTests/
│   └── URLImageGenerator.IntegrationTests/
└── docs/
```

### 2. Layer Responsibilities

#### API Layer (`URLImageGenerator.API`)
- **Controllers**: Handle HTTP requests/responses
- **Middleware**: Authentication, logging, error handling
- **Configuration**: API settings, CORS, Swagger
- **DTOs**: Request/response models
- **Validation**: Input validation attributes

#### Core Layer (`URLImageGenerator.Core`)
- **Entities**: Domain models
- **Interfaces**: Service contracts
- **Services**: Business logic
- **Enums**: Type definitions
- **Exceptions**: Custom exceptions

#### Infrastructure Layer (`URLImageGenerator.Infrastructure`)
- **Data**: Entity Framework context, repositories
- **External Services**: AI service integrations
- **Storage**: File storage (Azure Blob, AWS S3)
- **Caching**: Redis implementation
- **Background Jobs**: Hangfire, Quartz

#### Shared Layer (`URLImageGenerator.Shared`)
- **Utilities**: Common helper methods
- **Extensions**: Extension methods
- **Constants**: Application constants
- **Logging**: Logging abstractions

## API Design

### 1. RESTful Endpoints

#### Authentication & Users
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/profile
```

#### Jobs Management
```
GET    /api/jobs                    # List user's jobs
POST   /api/jobs                    # Create new job
GET    /api/jobs/{id}               # Get job details
PUT    /api/jobs/{id}               # Update job
DELETE /api/jobs/{id}               # Delete job
POST   /api/jobs/{id}/start         # Start job processing
POST   /api/jobs/{id}/cancel        # Cancel job
GET    /api/jobs/{id}/progress      # Get job progress (SSE)
```

#### Designs Management
```
GET    /api/jobs/{jobId}/designs    # List job designs
POST   /api/jobs/{jobId}/designs    # Create new design
GET    /api/designs/{id}            # Get design details
PUT    /api/designs/{id}            # Update design
DELETE /api/designs/{id}            # Delete design
POST   /api/designs/{id}/regenerate # Regenerate design
```

#### Apparel Items
```
GET    /api/designs/{id}/apparel    # List design apparel items
POST   /api/designs/{id}/apparel    # Create apparel item
PUT    /api/apparel/{id}            # Update apparel item
DELETE /api/apparel/{id}            # Delete apparel item
POST   /api/apparel/{id}/regenerate # Regenerate apparel item
```

#### Pantone Colors
```
GET    /api/colors                  # List Pantone colors
GET    /api/colors/search           # Search colors
GET    /api/colors/{id}             # Get color details
```

### 2. API Response Standards

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 100,
      "totalPages": 5,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

## Database Design

### 1. Database Technology
- **Primary Database**: PostgreSQL
- **Caching**: Redis
- **Search**: Elasticsearch (optional)

### 2. Key Design Principles
- **Normalization**: 3NF with strategic denormalization
- **Indexing**: Optimized for common queries
- **Partitioning**: Large tables partitioned by date
- **Soft Deletes**: Preserve data integrity
- **Audit Trail**: Track all changes

### 3. Connection Management
- **Connection Pooling**: Npgsql connection pool
- **Read Replicas**: For read-heavy operations
- **Transaction Management**: Unit of Work pattern

## Security Architecture

### 1. Authentication
- **JWT Tokens**: Stateless authentication
- **Refresh Tokens**: Long-lived session management
- **OAuth2**: Social login integration
- **Multi-Factor**: Optional 2FA support

### 2. Authorization
- **Role-Based Access Control (RBAC)**
- **Resource-Based Permissions**
- **API Key Management**
- **Rate Limiting**

### 3. Data Protection
- **Encryption at Rest**: Database encryption
- **Encryption in Transit**: HTTPS/TLS
- **Password Hashing**: bcrypt with salt
- **PII Protection**: Data anonymization

## Performance Architecture

### 1. Caching Strategy
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │    │   CDN       │    │   Redis     │
│   Cache     │◄──►│   Cache     │◄──►│   Cache     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │  Database   │
                                       └─────────────┘
```

### 2. Caching Layers
- **Browser Cache**: Static assets, API responses
- **CDN Cache**: Global content distribution
- **Redis Cache**: Session data, frequently accessed data
- **Database Cache**: Query result caching

### 3. Performance Optimizations
- **Async/Await**: Non-blocking operations
- **Connection Pooling**: Database connections
- **Lazy Loading**: Entity Framework
- **Pagination**: Large dataset handling
- **Background Jobs**: Long-running tasks

## External Service Integration

### 1. AI Service Providers
```
┌─────────────────┐
│   Backend API   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  AI Service     │
│  Abstraction    │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│  DALL-E │ │ Imagen  │
└─────────┘ └─────────┘
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│Stability│ │Replicate│
└─────────┘ └─────────┘
```

### 2. Service Abstraction
- **Provider Interface**: Common AI service interface
- **Factory Pattern**: Dynamic provider selection
- **Circuit Breaker**: Fault tolerance
- **Retry Logic**: Transient failure handling

## Background Processing

### 1. Job Processing Pipeline
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Job       │    │  Background │    │   AI        │
│   Creation  │───►│  Processor  │───►│  Services   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                           ▼
                   ┌─────────────┐
                   │  Database   │
                   │  Update     │
                   └─────────────┘
```

### 2. Background Job Types
- **Image Generation**: AI service calls
- **File Processing**: Image optimization
- **Email Notifications**: User communications
- **Data Cleanup**: Maintenance tasks
- **Report Generation**: Analytics

### 3. Job Queue Management
- **Hangfire**: .NET background job framework
- **Redis Backend**: Job storage and processing
- **Retry Policies**: Failed job handling
- **Monitoring**: Job status tracking

## File Storage Architecture

### 1. Storage Strategy
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │   Backend   │    │   Storage   │
│   Upload    │───►│   API       │───►│   Service   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                           ▼
                   ┌─────────────┐
                   │  Database   │
                   │  Metadata   │
                   └─────────────┘
```

### 2. File Types
- **User Uploads**: Logos, images
- **Generated Images**: AI-created designs
- **Apparel Mockups**: Product visualizations
- **Thumbnails**: Optimized previews

### 3. Storage Providers
- **Azure Blob Storage**: Primary storage
- **AWS S3**: Alternative storage
- **Local Storage**: Development environment
- **CDN**: Global content delivery

## Monitoring & Logging

### 1. Application Monitoring
- **Health Checks**: Service availability
- **Performance Metrics**: Response times, throughput
- **Error Tracking**: Exception monitoring
- **User Analytics**: Usage patterns

### 2. Logging Strategy
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Application │    │   Logging   │    │   Storage   │
│   Logs      │───►│  Framework  │───►│   System    │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 3. Log Levels
- **Trace**: Detailed debugging information
- **Debug**: Development debugging
- **Info**: General information
- **Warn**: Warning conditions
- **Error**: Error conditions
- **Fatal**: Critical errors

## Deployment Architecture

### 1. Environment Strategy
- **Development**: Local development
- **Staging**: Pre-production testing
- **Production**: Live application

### 2. Containerization
```
┌─────────────────┐
│   Docker        │
│   Container     │
├─────────────────┤
│   .NET Core     │
│   Application   │
├─────────────────┤
│   Dependencies  │
└─────────────────┘
```

### 3. Orchestration
- **Docker Compose**: Local development
- **Kubernetes**: Production orchestration
- **Azure Container Instances**: Cloud deployment
- **AWS ECS**: Alternative cloud deployment

## Scalability Considerations

### 1. Horizontal Scaling
- **Load Balancing**: Multiple API instances
- **Database Sharding**: Data partitioning
- **Microservices**: Service decomposition
- **CDN**: Global content distribution

### 2. Vertical Scaling
- **Resource Optimization**: CPU, memory, storage
- **Database Tuning**: Query optimization
- **Caching**: Performance improvement
- **Background Processing**: Async operations

### 3. Auto-Scaling
- **CPU-Based**: Scale on CPU usage
- **Memory-Based**: Scale on memory usage
- **Queue-Based**: Scale on job queue length
- **Custom Metrics**: Business-specific scaling

## Development Workflow

### 1. Version Control
- **Git**: Source code management
- **Branching Strategy**: GitFlow or GitHub Flow
- **Code Reviews**: Pull request process
- **CI/CD**: Automated testing and deployment

### 2. Testing Strategy
- **Unit Tests**: Business logic testing
- **Integration Tests**: API testing
- **End-to-End Tests**: Full workflow testing
- **Performance Tests**: Load and stress testing

### 3. Quality Assurance
- **Code Standards**: Style guidelines
- **Static Analysis**: Code quality tools
- **Security Scanning**: Vulnerability detection
- **Dependency Management**: Package updates

This architecture provides a solid foundation for building a scalable, maintainable SwagLab.ai application with clear separation of concerns and modern development practices.
