// Job Status Enum
export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export class JobStatusHelper {
  static isValid(status: string): boolean {
    return Object.values(JobStatus).includes(status as JobStatus);
  }

  static getTransitions(currentStatus: JobStatus): JobStatus[] {
    const transitions: Record<JobStatus, JobStatus[]> = {
      [JobStatus.PENDING]: [JobStatus.PROCESSING, JobStatus.CANCELLED],
      [JobStatus.PROCESSING]: [JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED],
      [JobStatus.COMPLETED]: [],
      [JobStatus.FAILED]: [JobStatus.PENDING, JobStatus.CANCELLED],
      [JobStatus.CANCELLED]: []
    };
    return transitions[currentStatus] || [];
  }
}

// User Role Enum
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export class UserRoleHelper {
  static hasPermission(role: UserRole, permission: string): boolean {
    const permissions: Record<UserRole, string[]> = {
      [UserRole.USER]: ['read:own', 'write:own'],
      [UserRole.MODERATOR]: ['read:all', 'write:own', 'moderate:content'],
      [UserRole.ADMIN]: ['read:all', 'write:all', 'delete:all', 'admin:all']
    };
    return permissions[role]?.includes(permission) || false;
  }

  static getPermissions(role: UserRole): string[] {
    const permissions: Record<UserRole, string[]> = {
      [UserRole.USER]: ['read:own', 'write:own'],
      [UserRole.MODERATOR]: ['read:all', 'write:own', 'moderate:content'],
      [UserRole.ADMIN]: ['read:all', 'write:all', 'delete:all', 'admin:all']
    };
    return permissions[role] || [];
  }
}

// Item Type Enum
export enum ItemType {
  T_SHIRT = 't-shirt',
  HAT = 'hat',
  HOODIE = 'hoodie',
  TANK_TOP = 'tank-top',
  LONG_SLEEVE = 'long-sleeve',
  POLO = 'polo',
  SWEATSHIRT = 'sweatshirt',
  JACKET = 'jacket'
}

export class ItemTypeHelper {
  static getSizes(itemType: ItemType): string[] {
    const sizeMap: Record<ItemType, string[]> = {
      [ItemType.T_SHIRT]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      [ItemType.HAT]: ['S', 'M', 'L', 'XL'],
      [ItemType.HOODIE]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      [ItemType.TANK_TOP]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      [ItemType.LONG_SLEEVE]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      [ItemType.POLO]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      [ItemType.SWEATSHIRT]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      [ItemType.JACKET]: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    };
    return sizeMap[itemType] || [];
  }

  static getDefaultImageCount(itemType: ItemType): number {
    const imageCountMap: Record<ItemType, number> = {
      [ItemType.T_SHIRT]: 2,
      [ItemType.HAT]: 1,
      [ItemType.HOODIE]: 2,
      [ItemType.TANK_TOP]: 2,
      [ItemType.LONG_SLEEVE]: 2,
      [ItemType.POLO]: 2,
      [ItemType.SWEATSHIRT]: 2,
      [ItemType.JACKET]: 3
    };
    return imageCountMap[itemType] || 1;
  }
}

// Generation Provider Enum
export enum GenerationProvider {
  DALLE = 'dalle',
  IMAGEN = 'imagen',
  STABILITY = 'stability',
  REPLICATE = 'replicate',
  MIDJOURNEY = 'midjourney'
}

export class GenerationProviderHelper {
  static getSupportedModels(provider: GenerationProvider): string[] {
    const models: Record<GenerationProvider, string[]> = {
      [GenerationProvider.DALLE]: ['dall-e-2', 'dall-e-3'],
      [GenerationProvider.IMAGEN]: ['imagen-2'],
      [GenerationProvider.STABILITY]: ['stable-diffusion-xl', 'stable-diffusion-2.1'],
      [GenerationProvider.REPLICATE]: ['stable-diffusion', 'midjourney'],
      [GenerationProvider.MIDJOURNEY]: ['midjourney-v5', 'midjourney-v6']
    };
    return models[provider] || [];
  }

  static getCostPerImage(provider: GenerationProvider): number {
    const costs: Record<GenerationProvider, number> = {
      [GenerationProvider.DALLE]: 0.02,
      [GenerationProvider.IMAGEN]: 0.015,
      [GenerationProvider.STABILITY]: 0.01,
      [GenerationProvider.REPLICATE]: 0.005,
      [GenerationProvider.MIDJOURNEY]: 0.03
    };
    return costs[provider] || 0.01;
  }

  static getAverageGenerationTime(provider: GenerationProvider): number {
    const times: Record<GenerationProvider, number> = {
      [GenerationProvider.DALLE]: 5000,
      [GenerationProvider.IMAGEN]: 3000,
      [GenerationProvider.STABILITY]: 2000,
      [GenerationProvider.REPLICATE]: 4000,
      [GenerationProvider.MIDJOURNEY]: 10000
    };
    return times[provider] || 5000;
  }
}

// Color Family Enum
export enum ColorFamily {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  ORANGE = 'orange',
  PINK = 'pink',
  BROWN = 'brown',
  GRAY = 'gray',
  BLACK = 'black',
  WHITE = 'white'
}

// Error Code Enum
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE'
}

// HTTP Status Code Enum
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

// Webhook Event Type Enum
export enum WebhookEventType {
  JOB_COMPLETED = 'job.completed',
  JOB_FAILED = 'job.failed',
  DESIGN_GENERATED = 'design.generated',
  APPAREL_GENERATED = 'apparel.generated'
}

// Sort Order Enum
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

// Sort Field Enums
export enum JobSortField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  STATUS = 'status',
  BRAND_NAME = 'brandName'
}

export enum DesignSortField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PROMPT = 'prompt'
}

export enum ApparelSortField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PRICE = 'price',
  ITEM_TYPE = 'itemType'
}

export enum ColorSortField {
  NAME = 'name',
  PANTONE_CODE = 'pantoneCode',
  COLOR_FAMILY = 'colorFamily'
}
