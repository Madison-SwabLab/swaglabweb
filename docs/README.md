# SwagLab.ai Documentation

This directory contains comprehensive documentation for the SwagLab.ai application, including API specifications, class definitions, and architectural guidance.

## 📚 Documentation Structure

### [API Documentation](api/)
- **API Interface**: Complete REST API specification with endpoints, request/response models, and authentication
- **OpenAPI Spec**: Machine-readable API documentation in OpenAPI 3.0 format
- **Postman Collection**: Ready-to-use API collection for testing

### [Architecture](architecture/)
- **System Design**: High-level architecture and design patterns
- **Database Schema**: Complete database design with relationships and constraints
- **Class Diagrams**: Visual representations of system components

### [Development](development/)
- **Setup Guide**: Step-by-step development environment setup
- **Coding Standards**: Code style and best practices
- **Testing Guide**: Testing strategies and implementation

## 🚀 Quick Start

1. **API Integration**: Start with the [API Interface](api/interface.md) to understand the backend integration
2. **Frontend Development**: Use the [TypeScript Types](api/typescript-types.md) for type-safe development
3. **Backend Development**: Follow the [Class Definitions](architecture/class-definitions.md) for implementation

## 🔧 API Base URLs

- **Development**: `https://localhost:7222/api`
- **Staging**: `https://staging-api.swaglab.ai/api`
- **Production**: `https://api.swaglab.ai/api`

## 📖 Key Resources

- **Authentication**: JWT-based authentication with refresh tokens
- **Rate Limiting**: 100 requests per minute per user
- **Error Handling**: Standardized error responses with detailed messages
- **Pagination**: Consistent pagination across all list endpoints

## 🤝 Contributing

When updating documentation:

1. Follow the existing structure and naming conventions
2. Include code examples and practical usage
3. Update the table of contents when adding new sections
4. Test all code examples before committing

## 📄 License

This documentation is part of the SwagLab.ai project and is licensed under the MIT License.
