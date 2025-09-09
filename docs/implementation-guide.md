# Implementation Guide

This guide provides step-by-step instructions for implementing the SwagLab.ai application using the universal class design documentation.

## Prerequisites

Before starting implementation, ensure you have:
- Development Environment: IDE, code editor, or development tools
- Database: PostgreSQL (recommended) or compatible database
- Language Runtime: Choose your preferred language (C#, Java, Python, etc.)
- Version Control: Git for source code management
- Documentation: This guide and the universal class design

## Implementation Steps

### Step 1: Project Setup

#### 1.1 Create Project Structure
```
your-project/
├── src/
│   ├── entities/          # Domain entities
│   ├── repositories/      # Data access layer
│   ├── services/          # Business logic
│   ├── controllers/       # API controllers
│   ├── dto/              # Data transfer objects
│   ├── config/           # Configuration
│   └── utils/            # Utility classes
├── tests/
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
├── docs/                 # Documentation
└── scripts/              # Database scripts
```

#### 1.2 Initialize Version Control
```bash
git init
git add .
git commit -m "Initial project setup"
```

#### 1.3 Set Up Dependencies
Choose your technology stack and install necessary dependencies:

**C# (.NET Core)**
```bash
dotnet new webapi -n SwagLab
cd SwagLab
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

**Java (Spring Boot)**
```bash
spring init --dependencies=web,data-jpa,postgresql SwagLab
```

**Python (Django)**
```bash
django-admin startproject swaglab
cd swaglab
pip install django psycopg2-binary
```

**TypeScript (Node.js)**
```bash
npm init -y
npm install express typeorm pg
```

### Step 2: Database Setup

#### 2.1 Create Database
```sql
CREATE DATABASE swaglab;
CREATE USER app_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE swaglab TO app_user;
```

#### 2.2 Run Schema Scripts
Execute the SQL scripts from the [Database Schema](database-schema.md) documentation:

1. **Create Tables**: Run all CREATE TABLE statements
2. **Create Indexes**: Add performance indexes
3. **Create Triggers**: Set up update timestamp triggers
4. **Insert Seed Data**: Add initial Pantone colors and other reference data

### Step 3: Implement Core Entities

#### 3.1 Create Base Entity Class
```typescript
// TypeScript example
export abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt?: Date;

    constructor() {
        this.id = generateUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isDeleted = false;
    }

    abstract validate(): boolean;
    abstract softDelete(): void;
}
```

#### 3.2 Implement User Entity
```typescript
export class User extends BaseEntity {
    username: string;
    email: string;
    passwordHash?: string;
    firstName?: string;
    lastName?: string;
    emailVerified: boolean;
    lastLogin?: Date;
    failedLoginAttempts: number;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    avatarUrl?: string;
    phoneNumber?: string;
    bio?: string;
    provider: string;
    providerId?: string;
    role: string;
    isActive: boolean;

    // Computed properties
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    get displayName(): string {
        return this.fullName || this.username;
    }

    // Methods
    validatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.passwordHash);
    }

    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    validate(): boolean {
        return !!(this.username && this.email && this.role);
    }

    softDelete(): void {
        this.isDeleted = true;
        this.deletedAt = new Date();
    }
}
```

### Step 4: Set Up Data Access Layer

#### 4.1 Create Repository Interfaces
```typescript
export interface IUserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<boolean>;
    findMany(filters: UserFilters): Promise<User[]>;
}
```

#### 4.2 Implement Repository Classes
```typescript
export class UserRepository implements IUserRepository {
    constructor(private db: Database) {}

    async create(user: User): Promise<User> {
        const query = `
            INSERT INTO users (id, username, email, password_hash, ...)
            VALUES ($1, $2, $3, $4, ...)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            user.id, user.username, user.email, user.passwordHash, ...
        ]);
        return this.mapToEntity(result.rows[0]);
    }

    async findById(id: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE id = $1 AND is_deleted = false';
        const result = await this.db.query(query, [id]);
        return result.rows.length > 0 ? this.mapToEntity(result.rows[0]) : null;
    }

    // Implement other methods...
}
```

### Step 5: Implement Business Logic Services

#### 5.1 Create Service Interfaces
```typescript
export interface IUserService {
    createUser(userData: CreateUserRequest): Promise<User>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, userData: UpdateUserRequest): Promise<User>;
    deleteUser(id: string): Promise<boolean>;
    authenticateUser(email: string, password: string): Promise<AuthResult>;
}
```

#### 5.2 Implement Service Classes
```typescript
export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
        private emailService: IEmailService,
        private auditService: IAuditService
    ) {}

    async createUser(userData: CreateUserRequest): Promise<User> {
        // Validate input
        if (!this.validateUserData(userData)) {
            throw new ValidationError('Invalid user data');
        }

        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new ConflictError('User already exists');
        }

        // Create user entity
        const user = new User();
        user.username = userData.username;
        user.email = userData.email;
        user.passwordHash = this.hashPassword(userData.password);
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;

        // Save to database
        const savedUser = await this.userRepository.create(user);

        // Send welcome email
        await this.emailService.sendWelcomeEmail(savedUser.email);

        // Log audit event
        await this.auditService.logAction(
            savedUser.id,
            'user_created',
            'user',
            savedUser.id,
            { email: savedUser.email }
        );

        return savedUser;
    }

    // Implement other methods...
}
```

### Step 6: Build API Controllers

#### 6.1 Create Controller Base Class
```typescript
export abstract class BaseController {
    protected handleError(error: Error, res: Response): void {
        if (error instanceof ValidationError) {
            res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: error.message,
                    details: error.details
                }
            });
        } else if (error instanceof NotFoundError) {
            res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: error.message
                }
            });
        } else {
            res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'An unexpected error occurred'
                }
            });
        }
    }
}
```

#### 6.2 Implement User Controller
```typescript
export class UserController extends BaseController {
    constructor(private userService: IUserService) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: CreateUserRequest = req.body;
            const user = await this.userService.createUser(userData);
            
            res.status(201).json({
                success: true,
                data: user,
                message: 'User created successfully'
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Implement other endpoints...
}
```

### Step 7: Set Up Authentication

#### 7.1 Implement JWT Service
```typescript
export class JWTService {
    private readonly secretKey: string;
    private readonly expiresIn: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET || 'your-secret-key';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    }

    generateToken(payload: any): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.secretKey);
    }

    generateRefreshToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }
}
```

### Step 8: Add Background Job Processing

#### 8.1 Create Job Queue Service
```typescript
export interface IJobQueueService {
    enqueueJob(jobId: string, priority: number): Promise<void>;
    processJobs(): Promise<void>;
    getJobStatus(jobId: string): Promise<JobStatus>;
}

export class JobQueueService implements IJobQueueService {
    constructor(
        private redis: Redis,
        private jobService: IJobService,
        private aiService: IAIService
    ) {}

    async enqueueJob(jobId: string, priority: number = 0): Promise<void> {
        await this.redis.zadd('job_queue', priority, jobId);
    }

    async processJobs(): Promise<void> {
        while (true) {
            const jobId = await this.redis.zpopmin('job_queue');
            if (jobId) {
                await this.processJob(jobId);
            }
            await this.sleep(1000); // Wait 1 second between jobs
        }
    }

    private async processJob(jobId: string): Promise<void> {
        try {
            const job = await this.jobService.getJobById(jobId);
            if (!job) return;

            // Update job status
            job.status = 'processing';
            await this.jobService.updateJob(job);

            // Process the job based on type
            if (job.type === 'image_generation') {
                await this.processImageGeneration(job);
            } else if (job.type === 'apparel_generation') {
                await this.processApparelGeneration(job);
            }

            // Mark as completed
            job.status = 'completed';
            job.completedAt = new Date();
            await this.jobService.updateJob(job);

        } catch (error) {
            // Mark as failed
            const job = await this.jobService.getJobById(jobId);
            if (job) {
                job.status = 'failed';
                job.errorMessage = error.message;
                await this.jobService.updateJob(job);
            }
        }
    }
}
```

### Step 9: Add Caching Layer

#### 9.1 Implement Cache Service
```typescript
export interface ICacheService {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
}

export class RedisCacheService implements ICacheService {
    constructor(private redis: Redis) {}

    async get<T>(key: string): Promise<T | null> {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }

    async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
        await this.redis.setex(key, ttl, JSON.stringify(value));
    }

    async delete(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async clear(): Promise<void> {
        await this.redis.flushall();
    }
}
```

### Step 10: Add Monitoring and Logging

#### 10.1 Set Up Logging
```typescript
export class Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
                new winston.transports.Console()
            ]
        });
    }

    info(message: string, meta?: any): void {
        this.logger.info(message, meta);
    }

    error(message: string, error?: Error): void {
        this.logger.error(message, { error: error?.stack });
    }

    warn(message: string, meta?: any): void {
        this.logger.warn(message, meta);
    }
}
```

### Step 11: Testing

#### 11.1 Unit Tests
```typescript
describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        mockUserRepository = createMockUserRepository();
        userService = new UserService(mockUserRepository, mockEmailService, mockAuditService);
    });

    describe('createUser', () => {
        it('should create a user successfully', async () => {
            const userData: CreateUserRequest = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            };

            const expectedUser = new User();
            expectedUser.username = userData.username;
            expectedUser.email = userData.email;

            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockUserRepository.create.mockResolvedValue(expectedUser);

            const result = await userService.createUser(userData);

            expect(result).toEqual(expectedUser);
            expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(User));
        });

        it('should throw error if user already exists', async () => {
            const userData: CreateUserRequest = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            };

            const existingUser = new User();
            mockUserRepository.findByEmail.mockResolvedValue(existingUser);

            await expect(userService.createUser(userData)).rejects.toThrow(ConflictError);
        });
    });
});
```

### Step 12: Deployment

#### 12.1 Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### 12.2 Create Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/swaglab
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=swaglab
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Next Steps

1. **Customize for Your Language**: Adapt the examples to your chosen programming language
2. **Add Features**: Implement additional functionality as needed
3. **Optimize Performance**: Add caching, indexing, and optimization
4. **Scale**: Implement horizontal scaling and load balancing
5. **Monitor**: Add comprehensive monitoring and alerting

## Additional Resources

- [Architecture Design](architecture.md) - System architecture and design patterns
- [Database Schema](database-schema.md) - Complete database design
- [Universal Class Design](universal-class-design.md) - Language-agnostic class definitions
- [API Interface](api/interface.md) - Complete API specification
- [Class Diagrams](class-diagrams.md) - Visual system representation

This implementation guide provides a solid foundation for building your SwagLab.ai application. Adapt the examples to your chosen technology stack and extend the functionality as needed for your specific requirements.
