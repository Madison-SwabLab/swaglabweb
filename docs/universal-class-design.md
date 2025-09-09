# Universal Class Design Documentation

## Overview
This document provides language-agnostic class definitions that can be implemented in any programming language (C#, Java, Python, TypeScript, Go, etc.). The classes are documented using a universal syntax that focuses on structure, relationships, and business logic rather than language-specific implementation details.

## Class Diagram Notation

### Basic Class Structure
```
ClassName
├── Properties (attributes)
├── Methods (operations)
├── Relationships
└── Constraints
```

### Relationship Types
- `1:1` - One-to-One
- `1:*` - One-to-Many
- `*:*` - Many-to-Many
- `→` - Association
- `◇` - Composition
- `△` - Inheritance

## Core Entity Classes

### 1. User Entity
```
User
├── Properties:
│   ├── id: UUID (Primary Key)
│   ├── username: String (Unique, Required)
│   ├── email: String (Unique, Required, Email Format)
│   ├── passwordHash: String (Optional, Hashed)
│   ├── firstName: String (Optional)
│   ├── lastName: String (Optional)
│   ├── emailVerified: Boolean (Default: false)
│   ├── lastLogin: DateTime (Optional)
│   ├── failedLoginAttempts: Integer (Default: 0)
│   ├── passwordResetToken: String (Optional)
│   ├── passwordResetExpires: DateTime (Optional)
│   ├── avatarUrl: String (Optional, URL Format)
│   ├── phoneNumber: String (Optional, Phone Format)
│   ├── bio: String (Optional, Text)
│   ├── provider: String (Default: "local")
│   ├── providerId: String (Optional)
│   ├── role: String (Default: "user", Enum: user|admin|moderator)
│   ├── isActive: Boolean (Default: true)
│   ├── createdAt: DateTime (Auto-generated)
│   └── updatedAt: DateTime (Auto-updated)
├── Computed Properties:
│   ├── fullName: String (firstName + " " + lastName)
│   └── displayName: String (fullName || username)
├── Methods:
│   ├── validatePassword(password: String): Boolean
│   ├── hashPassword(password: String): String
│   ├── generateResetToken(): String
│   └── isAccountLocked(): Boolean
└── Relationships:
    ├── 1:* → Job (User has many Jobs)
    ├── 1:* → UserSession (User has many Sessions)
    ├── 1:* → ApiKey (User has many API Keys)
    └── 1:* → AuditLog (User has many Audit Logs)
```

### 2. Job Entity
```
Job
├── Properties:
│   ├── id: UUID (Primary Key)
│   ├── userId: UUID (Foreign Key → User.id)
│   ├── siteUrl: String (Required, URL Format)
│   ├── brandName: String (Optional)
│   ├── brandPersonality: String (Optional, Text)
│   ├── industry: String (Optional)
│   ├── targetAudience: String (Optional)
│   ├── useExistingCompanyLogo: Boolean (Default: false)
│   ├── companyLogoUrl: String (Optional, URL Format)
│   ├── useUploadedImage: Boolean (Default: false)
│   ├── uploadedImageUrl: String (Optional, URL Format)
│   ├── designStyles: String[] (Array of Strings)
│   ├── designElements: String[] (Array of Strings)
│   ├── accentColors: String[] (Array of Hex Colors)
│   ├── fonts: String[] (Array of Font Names)
│   ├── status: String (Enum: pending|processing|completed|failed|cancelled)
│   ├── currentStep: String (Optional)
│   ├── progress: Integer (0-100, Default: 0)
│   ├── errorMessage: String (Optional, Text)
│   ├── analysisResult: JSON (Optional, Complex Object)
│   ├── createdAt: DateTime (Auto-generated)
│   ├── updatedAt: DateTime (Auto-updated)
│   ├── completedAt: DateTime (Optional)
│   ├── isDeleted: Boolean (Default: false)
│   └── deletedAt: DateTime (Optional)
├── Computed Properties:
│   ├── isCompleted: Boolean (status === "completed")
│   ├── isFailed: Boolean (status === "failed")
│   ├── isProcessing: Boolean (status === "processing")
│   └── duration: Duration (completedAt - createdAt)
├── Methods:
│   ├── startProcessing(): void
│   ├── updateProgress(step: String, progress: Integer): void
│   ├── completeJob(result: JSON): void
│   ├── failJob(error: String): void
│   └── softDelete(): void
└── Relationships:
    ├── *:1 → User (Job belongs to User)
    ├── 1:* → Design (Job has many Designs)
    └── *:* → PantoneColor (Job has many Pantone Colors)
```

### 3. Design Entity
```
Design
├── Properties:
│   ├── id: UUID (Primary Key)
│   ├── jobId: UUID (Foreign Key → Job.id)
│   ├── designImgUrl: String (Required, URL Format)
│   ├── aspectRatio: String (Default: "1:1", Format: "W:H")
│   ├── prompt: String (Required, Text)
│   ├── negativePrompt: String (Optional, Text)
│   ├── designStyle: String (Optional)
│   ├── designElements: String[] (Array of Strings)
│   ├── accentColors: String[] (Array of Hex Colors)
│   ├── fonts: String[] (Array of Font Names)
│   ├── generationProvider: String (Optional, Enum: dalle|imagen|stability|replicate)
│   ├── generationModel: String (Optional)
│   ├── generationTimeMs: Integer (Optional, Milliseconds)
│   ├── generationCost: Decimal (Optional, Currency)
│   ├── createdAt: DateTime (Auto-generated)
│   ├── updatedAt: DateTime (Auto-updated)
│   ├── isDeleted: Boolean (Default: false)
│   └── deletedAt: DateTime (Optional)
├── Methods:
│   ├── regenerate(prompt: String, provider: String): Design
│   ├── updatePrompt(prompt: String): void
│   └── softDelete(): void
└── Relationships:
    ├── *:1 → Job (Design belongs to Job)
    ├── 1:* → ApparelItem (Design has many Apparel Items)
    └── 1:* → PersonRendering (Design has many Person Renderings)
```

### 4. PantoneColor Entity
```
PantoneColor
├── Properties:
│   ├── id: UUID (Primary Key)
│   ├── name: String (Required, Unique)
│   ├── pantoneCode: String (Required, Unique, Format: "PANTONE XX-XXXX TCX")
│   ├── hex: String (Required, Format: "#RRGGBB")
│   ├── rgbR: Integer (0-255, Required)
│   ├── rgbG: Integer (0-255, Required)
│   ├── rgbB: Integer (0-255, Required)
│   ├── cmykC: Decimal (0-100, Optional)
│   ├── cmykM: Decimal (0-100, Optional)
│   ├── cmykY: Decimal (0-100, Optional)
│   ├── cmykK: Decimal (0-100, Optional)
│   ├── description: String (Optional, Text)
│   ├── colorFamily: String (Optional, Enum: red|blue|green|yellow|purple|orange|pink|brown|gray|black|white)
│   ├── isMetallic: Boolean (Default: false)
│   ├── isFluorescent: Boolean (Default: false)
│   ├── createdAt: DateTime (Auto-generated)
│   └── updatedAt: DateTime (Auto-updated)
├── Computed Properties:
│   ├── rgbString: String ("rgb(r, g, b)")
│   ├── cmykString: String ("cmyk(c%, m%, y%, k%)")
│   └── hslValues: Object {h: Number, s: Number, l: Number}
├── Methods:
│   ├── toHex(): String
│   ├── toRgb(): Object {r: Number, g: Number, b: Number}
│   ├── toCmyk(): Object {c: Number, m: Number, y: Number, k: Number}
│   ├── toHsl(): Object {h: Number, s: Number, l: Number}
│   └── getContrastColor(): String (Returns black or white for best contrast)
└── Relationships:
    ├── *:* → Job (Pantone Color used in many Jobs)
    └── 1:* → ApparelItem (Pantone Color used in many Apparel Items)
```

### 5. ApparelItem Entity
```
ApparelItem
├── Properties:
│   ├── id: UUID (Primary Key)
│   ├── designId: UUID (Foreign Key → Design.id)
│   ├── pantoneColorId: UUID (Foreign Key → PantoneColor.id, Optional)
│   ├── itemType: String (Required, Enum: t-shirt|hat|hoodie|tank-top|long-sleeve|polo|sweatshirt|jacket)
│   ├── itemSize: String (Optional, Enum: XS|S|M|L|XL|XXL|XXXL)
│   ├── apparelImgUrl1: String (Optional, URL Format, Front View)
│   ├── apparelImgUrl2: String (Optional, URL Format, Back View)
│   ├── apparelImgUrl3: String (Optional, URL Format, Additional View)
│   ├── description: String (Optional, Text)
│   ├── price: Decimal (Optional, Currency)
│   ├── salePrice: Decimal (Optional, Currency)
│   ├── supplierUrl: String (Optional, URL Format)
│   ├── supplierProductId: String (Optional)
│   ├── generationPrompt: String (Optional, Text)
│   ├── generationProvider: String (Optional)
│   ├── generationTimeMs: Integer (Optional, Milliseconds)
│   ├── createdAt: DateTime (Auto-generated)
│   ├── updatedAt: DateTime (Auto-updated)
│   ├── isDeleted: Boolean (Default: false)
│   └── deletedAt: DateTime (Optional)
├── Computed Properties:
│   ├── currentPrice: Decimal (salePrice || price)
│   ├── isOnSale: Boolean (salePrice < price)
│   ├── discountAmount: Decimal (price - salePrice)
│   └── discountPercentage: Decimal ((discountAmount / price) * 100)
├── Methods:
│   ├── regenerate(prompt: String): ApparelItem
│   ├── updatePricing(price: Decimal, salePrice: Decimal): void
│   └── softDelete(): void
└── Relationships:
    ├── *:1 → Design (Apparel Item belongs to Design)
    └── *:1 → PantoneColor (Apparel Item uses Pantone Color)
```

## Enumerations

### 6. JobStatus Enum
```
JobStatus
├── Values:
│   ├── PENDING = "pending"
│   ├── PROCESSING = "processing"
│   ├── COMPLETED = "completed"
│   ├── FAILED = "failed"
│   └── CANCELLED = "cancelled"
└── Methods:
    ├── isValid(status: String): Boolean
    └── getTransitions(currentStatus: JobStatus): JobStatus[]
```

### 7. UserRole Enum
```
UserRole
├── Values:
│   ├── USER = "user"
│   ├── ADMIN = "admin"
│   └── MODERATOR = "moderator"
└── Methods:
    ├── hasPermission(role: UserRole, permission: String): Boolean
    └── getPermissions(role: UserRole): String[]
```

### 8. ItemType Enum
```
ItemType
├── Values:
│   ├── T_SHIRT = "t-shirt"
│   ├── HAT = "hat"
│   ├── HOODIE = "hoodie"
│   ├── TANK_TOP = "tank-top"
│   ├── LONG_SLEEVE = "long-sleeve"
│   ├── POLO = "polo"
│   ├── SWEATSHIRT = "sweatshirt"
│   └── JACKET = "jacket"
└── Methods:
    ├── getSizes(itemType: ItemType): String[]
    └── getDefaultImageCount(itemType: ItemType): Integer
```

### 9. GenerationProvider Enum
```
GenerationProvider
├── Values:
│   ├── DALLE = "dalle"
│   ├── IMAGEN = "imagen"
│   ├── STABILITY = "stability"
│   ├── REPLICATE = "replicate"
│   └── MIDJOURNEY = "midjourney"
└── Methods:
    ├── getSupportedModels(provider: GenerationProvider): String[]
    ├── getCostPerImage(provider: GenerationProvider): Decimal
    └── getAverageGenerationTime(provider: GenerationProvider): Integer
```

## Data Transfer Objects (DTOs)

### 10. Base Response DTO
```
BaseResponse<T>
├── Properties:
│   ├── success: Boolean (Required)
│   ├── data: T (Optional, Generic Type)
│   ├── message: String (Optional)
│   ├── error: ErrorObject (Optional)
│   └── timestamp: DateTime (Auto-generated)
└── Methods:
    ├── success(data: T, message: String): BaseResponse<T>
    ├── error(error: ErrorObject, message: String): BaseResponse<T>
    └── validate(): Boolean
```

### 11. Error Object DTO
```
ErrorObject
├── Properties:
│   ├── code: String (Required, Enum: VALIDATION_ERROR|AUTHENTICATION_ERROR|AUTHORIZATION_ERROR|NOT_FOUND|CONFLICT|RATE_LIMIT_EXCEEDED|INTERNAL_ERROR|SERVICE_UNAVAILABLE)
│   ├── message: String (Required)
│   └── details: ValidationError[] (Optional, Array of Validation Errors)
└── Methods:
    ├── addValidationError(field: String, message: String): void
    └── hasValidationErrors(): Boolean
```

## Service Interfaces

### 12. User Service Interface
```
IUserService
├── Methods:
│   ├── createUser(userData: CreateUserRequest): User
│   ├── getUserById(id: UUID): User
│   ├── getUserByEmail(email: String): User
│   ├── updateUser(id: UUID, userData: UpdateUserRequest): User
│   ├── deleteUser(id: UUID): Boolean
│   ├── authenticateUser(email: String, password: String): AuthResult
│   ├── refreshToken(refreshToken: String): AuthResult
│   ├── resetPassword(email: String): Boolean
│   ├── changePassword(userId: UUID, oldPassword: String, newPassword: String): Boolean
│   └── validateUser(userId: UUID): Boolean
└── Events:
    ├── onUserCreated(user: User): void
    ├── onUserUpdated(user: User): void
    └── onUserDeleted(userId: UUID): void
```

### 13. Job Service Interface
```
IJobService
├── Methods:
│   ├── createJob(userId: UUID, jobData: CreateJobRequest): Job
│   ├── getJobById(id: UUID): Job
│   ├── getJobsByUserId(userId: UUID, filters: JobFilters): Job[]
│   ├── updateJob(id: UUID, jobData: UpdateJobRequest): Job
│   ├── deleteJob(id: UUID): Boolean
│   ├── startJobProcessing(id: UUID): Boolean
│   ├── cancelJob(id: UUID): Boolean
│   ├── getJobProgress(id: UUID): JobProgress
│   └── getJobStatus(id: UUID): JobStatus
└── Events:
    ├── onJobCreated(job: Job): void
    ├── onJobStarted(job: Job): void
    ├── onJobProgress(job: Job, progress: Integer): void
    ├── onJobCompleted(job: Job): void
    └── onJobFailed(job: Job, error: String): void
```

## Business Logic Classes

### 14. Color Utility Class
```
ColorUtils
├── Static Methods:
│   ├── hexToRgb(hex: String): Object {r: Number, g: Number, b: Number}
│   ├── rgbToHex(r: Number, g: Number, b: Number): String
│   ├── rgbToCmyk(r: Number, g: Number, b: Number): Object {c: Number, m: Number, y: Number, k: Number}
│   ├── cmykToRgb(c: Number, m: Number, y: Number, k: Number): Object {r: Number, g: Number, b: Number}
│   ├── rgbToHsl(r: Number, g: Number, b: Number): Object {h: Number, s: Number, l: Number}
│   ├── hslToRgb(h: Number, s: Number, l: Number): Object {r: Number, g: Number, b: Number}
│   ├── getContrastColor(hex: String): String (Returns "#000000" or "#FFFFFF")
│   ├── getColorDistance(color1: String, color2: String): Number
│   ├── generateColorPalette(baseColor: String, count: Integer): String[]
│   └── validateHexColor(hex: String): Boolean
└── Constants:
    ├── COLOR_FAMILIES: String[]
    └── PANTONE_COLOR_RANGES: Object
```

### 15. Image Processing Utility Class
```
ImageUtils
├── Static Methods:
│   ├── validateImageUrl(url: String): Boolean
│   ├── getImageDimensions(url: String): Object {width: Number, height: Number}
│   ├── calculateAspectRatio(width: Number, height: Number): String
│   ├── resizeImage(url: String, width: Number, height: Number): String
│   ├── generateThumbnail(url: String, size: Number): String
│   ├── compressImage(url: String, quality: Number): String
│   ├── convertImageFormat(url: String, format: String): String
│   ├── extractImageColors(url: String, count: Integer): String[]
│   ├── detectImageContent(url: String): Object {hasText: Boolean, hasFaces: Boolean, hasObjects: String[]}
│   └── generateImageHash(url: String): String
└── Constants:
    ├── SUPPORTED_FORMATS: String[]
    ├── MAX_IMAGE_SIZE: Number
    └── THUMBNAIL_SIZES: Number[]
```

### 16. Validation Utility Class
```
ValidationUtils
├── Static Methods:
│   ├── validateEmail(email: String): Boolean
│   ├── validatePassword(password: String): ValidationResult
│   ├── validateUrl(url: String): Boolean
│   ├── validatePhoneNumber(phone: String): Boolean
│   ├── validateHexColor(hex: String): Boolean
│   ├── validateAspectRatio(ratio: String): Boolean
│   ├── validatePantoneCode(code: String): Boolean
│   ├── validateUuid(uuid: String): Boolean
│   ├── sanitizeString(input: String): String
│   └── validateJson(json: String): Boolean
└── Constants:
    ├── EMAIL_REGEX: String
    ├── PASSWORD_REGEX: String
    ├── URL_REGEX: String
    └── PHONE_REGEX: String
```

This universal class design provides:

1. **Language Independence**: Can be implemented in any programming language
2. **Clear Structure**: Properties, methods, and relationships are clearly defined
3. **Business Logic**: Includes computed properties and business methods
4. **Validation**: Built-in validation rules and constraints
5. **Relationships**: Clear entity relationships and cardinalities
6. **Extensibility**: Easy to extend with new properties and methods
7. **Type Safety**: Strong typing with enums and validation
8. **Documentation**: Self-documenting with clear naming conventions

The design can be easily adapted to:
- **C#**: Entity Framework, ASP.NET Core
- **Java**: Spring Boot, JPA/Hibernate
- **Python**: Django, SQLAlchemy, FastAPI
- **TypeScript**: Node.js, Prisma, TypeORM
- **Go**: GORM, Gin, Echo
- **PHP**: Laravel, Symfony
- **Ruby**: Rails, ActiveRecord
- **Any other language** with similar OOP concepts
