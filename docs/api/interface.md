# API Interface Specification

## Overview
This document defines the RESTful API interfaces for the SwagLab.ai application. The API follows REST principles and provides comprehensive endpoints for all application functionality.

## Base Configuration

### Base URL
```
Development: https://localhost:7222/api
Production: https://api.swaglab.ai/api
```

### Authentication
All endpoints (except public ones) require authentication via JWT Bearer token:
```
Authorization: Bearer <jwt_token>
```

### Content Type
All requests and responses use JSON:
```
Content-Type: application/json
Accept: application/json
```

## Authentication Endpoints

### 1. User Registration
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "emailVerified": false,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "User registered successfully"
}
```

### 2. User Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true
    }
  },
  "message": "Login successful"
}
```

### 3. Refresh Token
```http
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token",
    "expiresIn": 3600
  },
  "message": "Token refreshed successfully"
}
```

### 4. Logout
```http
POST /api/auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## User Management Endpoints

### 1. Get User Profile
```http
GET /api/users/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "phoneNumber": "+1234567890",
    "bio": "User bio",
    "role": "user",
    "isActive": true,
    "emailVerified": true,
    "lastLogin": "2024-01-01T00:00:00Z",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### 2. Update User Profile
```http
PUT /api/users/profile
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "bio": "Updated bio"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "bio": "Updated bio",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Profile updated successfully"
}
```

## Job Management Endpoints

### 1. List Jobs
```http
GET /api/jobs?page=1&pageSize=20&status=completed&sortBy=createdAt&sortOrder=desc
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 20, max: 100)
- `status`: Filter by status (pending, processing, completed, failed, cancelled)
- `sortBy`: Sort field (createdAt, updatedAt, status)
- `sortOrder`: Sort direction (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "siteUrl": "https://example.com",
        "brandName": "Example Brand",
        "status": "completed",
        "progress": 100,
        "createdAt": "2024-01-01T00:00:00Z",
        "completedAt": "2024-01-01T01:00:00Z",
        "designsCount": 5
      }
    ],
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

### 2. Create Job
```http
POST /api/jobs
```

**Request Body:**
```json
{
  "siteUrl": "https://example.com",
  "brandName": "Example Brand",
  "brandPersonality": "Modern and professional",
  "industry": "Technology",
  "targetAudience": "Young professionals",
  "useExistingCompanyLogo": false,
  "useUploadedImage": true,
  "uploadedImageUrl": "https://example.com/logo.png",
  "designStyles": ["modern", "clean", "minimalist"],
  "designElements": ["geometric", "typography", "icons"],
  "accentColors": ["#FF6B6B", "#4ECDC4", "#45B7D1"],
  "fonts": ["Inter", "Roboto", "Open Sans"],
  "pantoneColorIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "siteUrl": "https://example.com",
    "brandName": "Example Brand",
    "status": "pending",
    "progress": 0,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "Job created successfully"
}
```

### 3. Get Job Details
```http
GET /api/jobs/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "siteUrl": "https://example.com",
    "brandName": "Example Brand",
    "brandPersonality": "Modern and professional",
    "industry": "Technology",
    "targetAudience": "Young professionals",
    "status": "completed",
    "progress": 100,
    "currentStep": "Generating apparel mockups",
    "createdAt": "2024-01-01T00:00:00Z",
    "completedAt": "2024-01-01T01:00:00Z",
    "designs": [
      {
        "id": "uuid",
        "designImgUrl": "https://example.com/design1.jpg",
        "aspectRatio": "1:1",
        "prompt": "Modern logo design",
        "createdAt": "2024-01-01T00:30:00Z"
      }
    ],
    "pantoneColors": [
      {
        "id": "uuid",
        "name": "Bright Red",
        "pantoneCode": "PANTONE 18-1663 TCX",
        "hex": "#DA291C"
      }
    ]
  }
}
```

### 4. Update Job
```http
PUT /api/jobs/{id}
```

**Request Body:**
```json
{
  "brandName": "Updated Brand Name",
  "brandPersonality": "Updated personality",
  "targetAudience": "Updated audience"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "brandName": "Updated Brand Name",
    "brandPersonality": "Updated personality",
    "targetAudience": "Updated audience",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Job updated successfully"
}
```

### 5. Delete Job
```http
DELETE /api/jobs/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

### 6. Start Job Processing
```http
POST /api/jobs/{id}/start
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "processing",
    "progress": 0,
    "currentStep": "Analyzing website"
  },
  "message": "Job processing started"
}
```

### 7. Cancel Job
```http
POST /api/jobs/{id}/cancel
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "cancelled",
    "progress": 50
  },
  "message": "Job cancelled successfully"
}
```

### 8. Get Job Progress (Server-Sent Events)
```http
GET /api/jobs/{id}/progress
```

**Response:** Server-Sent Events stream
```
event: progress
data: {"status":"processing","progress":50,"currentStep":"Generating designs"}

event: complete
data: {"status":"completed","progress":100,"result":"Job completed successfully"}
```

## Design Management Endpoints

### 1. List Job Designs
```http
GET /api/jobs/{jobId}/designs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "designImgUrl": "https://example.com/design1.jpg",
      "aspectRatio": "1:1",
      "prompt": "Modern logo design",
      "designStyle": "minimalist",
      "createdAt": "2024-01-01T00:30:00Z",
      "apparelItemsCount": 3,
      "personRenderingsCount": 1
    }
  ]
}
```

### 2. Create Design
```http
POST /api/jobs/{jobId}/designs
```

**Request Body:**
```json
{
  "prompt": "Create a modern logo with geometric shapes",
  "negativePrompt": "avoid text, avoid complex details",
  "aspectRatio": "1:1",
  "designStyle": "minimalist",
  "designElements": ["geometric", "shapes", "lines"],
  "accentColors": ["#FF6B6B", "#4ECDC4"],
  "fonts": ["Inter", "Roboto"],
  "generationProvider": "dalle",
  "generationModel": "dall-e-3"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "designImgUrl": "https://example.com/design1.jpg",
    "aspectRatio": "1:1",
    "prompt": "Create a modern logo with geometric shapes",
    "generationProvider": "dalle",
    "generationTimeMs": 5000,
    "createdAt": "2024-01-01T00:30:00Z"
  },
  "message": "Design created successfully"
}
```

### 3. Get Design Details
```http
GET /api/designs/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "jobId": "uuid",
    "designImgUrl": "https://example.com/design1.jpg",
    "aspectRatio": "1:1",
    "prompt": "Create a modern logo with geometric shapes",
    "negativePrompt": "avoid text, avoid complex details",
    "designStyle": "minimalist",
    "designElements": ["geometric", "shapes", "lines"],
    "accentColors": ["#FF6B6B", "#4ECDC4"],
    "fonts": ["Inter", "Roboto"],
    "generationProvider": "dalle",
    "generationModel": "dall-e-3",
    "generationTimeMs": 5000,
    "generationCost": 0.02,
    "createdAt": "2024-01-01T00:30:00Z",
    "apparelItems": [
      {
        "id": "uuid",
        "itemType": "t-shirt",
        "apparelImgUrl1": "https://example.com/apparel1.jpg",
        "price": 29.99
      }
    ],
    "personRenderings": [
      {
        "id": "uuid",
        "personImgUrl": "https://example.com/person1.jpg",
        "targetAudience": "young adults"
      }
    ]
  }
}
```

### 4. Update Design
```http
PUT /api/designs/{id}
```

**Request Body:**
```json
{
  "prompt": "Updated prompt for the design",
  "negativePrompt": "Updated negative prompt",
  "designStyle": "modern"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "prompt": "Updated prompt for the design",
    "negativePrompt": "Updated negative prompt",
    "designStyle": "modern",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Design updated successfully"
}
```

### 5. Delete Design
```http
DELETE /api/designs/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Design deleted successfully"
}
```

### 6. Regenerate Design
```http
POST /api/designs/{id}/regenerate
```

**Request Body:**
```json
{
  "prompt": "New prompt for regeneration",
  "negativePrompt": "New negative prompt",
  "generationProvider": "imagen"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "designImgUrl": "https://example.com/design1_new.jpg",
    "prompt": "New prompt for regeneration",
    "generationTimeMs": 3000,
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Design regenerated successfully"
}
```

## Apparel Items Endpoints

### 1. List Design Apparel Items
```http
GET /api/designs/{designId}/apparel
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "itemType": "t-shirt",
      "itemSize": "M",
      "apparelImgUrl1": "https://example.com/apparel1.jpg",
      "apparelImgUrl2": "https://example.com/apparel1_back.jpg",
      "price": 29.99,
      "salePrice": 24.99,
      "isOnSale": true,
      "discountPercentage": 16.67,
      "pantoneColor": {
        "id": "uuid",
        "name": "Bright Red",
        "hex": "#DA291C"
      }
    }
  ]
}
```

### 2. Create Apparel Item
```http
POST /api/designs/{designId}/apparel
```

**Request Body:**
```json
{
  "itemType": "t-shirt",
  "itemSize": "M",
  "pantoneColorId": "uuid",
  "description": "High-quality cotton t-shirt",
  "price": 29.99,
  "salePrice": 24.99,
  "supplierUrl": "https://supplier.com/product/123",
  "supplierProductId": "SUP-123",
  "generationPrompt": "Generate t-shirt mockup with logo"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "itemType": "t-shirt",
    "itemSize": "M",
    "apparelImgUrl1": "https://example.com/apparel1.jpg",
    "price": 29.99,
    "salePrice": 24.99,
    "isOnSale": true,
    "discountPercentage": 16.67,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "Apparel item created successfully"
}
```

### 3. Update Apparel Item
```http
PUT /api/apparel/{id}
```

**Request Body:**
```json
{
  "price": 34.99,
  "salePrice": 29.99,
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "price": 34.99,
    "salePrice": 29.99,
    "description": "Updated description",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Apparel item updated successfully"
}
```

### 4. Delete Apparel Item
```http
DELETE /api/apparel/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Apparel item deleted successfully"
}
```

### 5. Regenerate Apparel Item
```http
POST /api/apparel/{id}/regenerate
```

**Request Body:**
```json
{
  "generationPrompt": "New prompt for regeneration",
  "generationProvider": "imagen"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "apparelImgUrl1": "https://example.com/apparel1_new.jpg",
    "generationTimeMs": 2000,
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Apparel item regenerated successfully"
}
```

## Pantone Colors Endpoints

### 1. List Pantone Colors
```http
GET /api/colors?page=1&pageSize=50&colorFamily=red&search=red
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 50, max: 100)
- `colorFamily`: Filter by color family
- `search`: Search by name or code

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Bright Red",
        "pantoneCode": "PANTONE 18-1663 TCX",
        "hex": "#DA291C",
        "rgbR": 218,
        "rgbG": 41,
        "rgbB": 28,
        "cmykC": 0,
        "cmykM": 81,
        "cmykY": 87,
        "cmykK": 15,
        "description": "A vibrant, energetic red",
        "colorFamily": "red",
        "isMetallic": false,
        "isFluorescent": false,
        "rgbString": "rgb(218, 41, 28)",
        "cmykString": "cmyk(0%, 81%, 87%, 15%)"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "totalItems": 1000,
      "totalPages": 20,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

### 2. Get Color Details
```http
GET /api/colors/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Bright Red",
    "pantoneCode": "PANTONE 18-1663 TCX",
    "hex": "#DA291C",
    "rgbR": 218,
    "rgbG": 41,
    "rgbB": 28,
    "cmykC": 0,
    "cmykM": 81,
    "cmykY": 87,
    "cmykK": 15,
    "description": "A vibrant, energetic red",
    "colorFamily": "red",
    "isMetallic": false,
    "isFluorescent": false,
    "rgbString": "rgb(218, 41, 28)",
    "cmykString": "cmyk(0%, 81%, 87%, 15%)"
  }
}
```

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_ERROR`: Authentication required
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error
- `SERVICE_UNAVAILABLE`: External service unavailable

### HTTP Status Codes
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid request
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict
- `422 Unprocessable Entity`: Validation error
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service unavailable

## Rate Limiting

### Rate Limits
- **Authentication endpoints**: 5 requests per minute per IP
- **General API endpoints**: 100 requests per minute per user
- **File upload endpoints**: 10 requests per minute per user
- **Background job endpoints**: 20 requests per minute per user

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Pagination

### Pagination Parameters
- `page`: Page number (1-based)
- `pageSize`: Items per page (default: 20, max: 100)

### Pagination Response
```json
{
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

## Sorting

### Sort Parameters
- `sortBy`: Field to sort by
- `sortOrder`: Sort direction (asc, desc)

### Supported Sort Fields
- **Jobs**: createdAt, updatedAt, status, brandName
- **Designs**: createdAt, updatedAt, prompt
- **Apparel Items**: createdAt, updatedAt, price, itemType
- **Colors**: name, pantoneCode, colorFamily

## Filtering

### Filter Parameters
- **Jobs**: status, industry, targetAudience
- **Designs**: designStyle, generationProvider
- **Apparel Items**: itemType, itemSize, isOnSale
- **Colors**: colorFamily, isMetallic, isFluorescent

## Webhooks

### Webhook Events
- `job.completed`: Job processing completed
- `job.failed`: Job processing failed
- `design.generated`: New design generated
- `apparel.generated`: New apparel item generated

### Webhook Payload
```json
{
  "event": "job.completed",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    "jobId": "uuid",
    "status": "completed",
    "designsCount": 5,
    "apparelItemsCount": 15
  }
}
```

This API specification provides a comprehensive interface for building a robust SwagLab.ai application with full CRUD operations, real-time updates, and scalable architecture.