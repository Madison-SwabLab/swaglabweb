// API Response Types
export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ErrorObject;
  timestamp?: string;
}

export interface ErrorObject {
  code: string;
  message: string;
  details?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  bio?: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

// Job Types
export interface Job {
  id: string;
  userId: string;
  siteUrl: string;
  brandName?: string;
  brandPersonality?: string;
  industry?: string;
  targetAudience?: string;
  useExistingCompanyLogo: boolean;
  companyLogoUrl?: string;
  useUploadedImage: boolean;
  uploadedImageUrl?: string;
  designStyles: string[];
  designElements: string[];
  accentColors: string[];
  fonts: string[];
  status: JobStatus;
  currentStep?: string;
  progress: number;
  errorMessage?: string;
  analysisResult?: any;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  designsCount?: number;
  pantoneColors?: PantoneColor[];
}

export interface CreateJobRequest {
  siteUrl: string;
  brandName?: string;
  brandPersonality?: string;
  industry?: string;
  targetAudience?: string;
  useExistingCompanyLogo?: boolean;
  useUploadedImage?: boolean;
  uploadedImageUrl?: string;
  designStyles?: string[];
  designElements?: string[];
  accentColors?: string[];
  fonts?: string[];
  pantoneColorIds?: string[];
}

export interface UpdateJobRequest {
  brandName?: string;
  brandPersonality?: string;
  targetAudience?: string;
  designStyles?: string[];
  designElements?: string[];
  accentColors?: string[];
  fonts?: string[];
}

export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface JobProgress {
  status: JobStatus;
  progress: number;
  currentStep?: string;
  result?: string;
}

// Design Types
export interface Design {
  id: string;
  jobId: string;
  designImgUrl: string;
  aspectRatio: string;
  prompt: string;
  negativePrompt?: string;
  designStyle?: string;
  designElements: string[];
  accentColors: string[];
  fonts: string[];
  generationProvider?: GenerationProvider;
  generationModel?: string;
  generationTimeMs?: number;
  generationCost?: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt?: string;
  apparelItemsCount?: number;
  personRenderingsCount?: number;
  apparelItems?: ApparelItem[];
  personRenderings?: PersonRendering[];
}

export interface CreateDesignRequest {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: string;
  designStyle?: string;
  designElements?: string[];
  accentColors?: string[];
  fonts?: string[];
  generationProvider?: GenerationProvider;
  generationModel?: string;
}

export interface UpdateDesignRequest {
  prompt?: string;
  negativePrompt?: string;
  designStyle?: string;
  designElements?: string[];
  accentColors?: string[];
  fonts?: string[];
}

export interface RegenerateDesignRequest {
  prompt?: string;
  negativePrompt?: string;
  generationProvider?: GenerationProvider;
}

export enum GenerationProvider {
  DALLE = 'dalle',
  IMAGEN = 'imagen',
  STABILITY = 'stability',
  REPLICATE = 'replicate',
  MIDJOURNEY = 'midjourney'
}

// Apparel Item Types
export interface ApparelItem {
  id: string;
  designId: string;
  pantoneColorId?: string;
  itemType: ItemType;
  itemSize?: ItemSize;
  apparelImgUrl1?: string;
  apparelImgUrl2?: string;
  apparelImgUrl3?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  supplierUrl?: string;
  supplierProductId?: string;
  generationPrompt?: string;
  generationProvider?: GenerationProvider;
  generationTimeMs?: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt?: string;
  pantoneColor?: PantoneColor;
  isOnSale?: boolean;
  discountPercentage?: number;
}

export interface CreateApparelItemRequest {
  itemType: ItemType;
  itemSize?: ItemSize;
  pantoneColorId?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  supplierUrl?: string;
  supplierProductId?: string;
  generationPrompt?: string;
}

export interface UpdateApparelItemRequest {
  price?: number;
  salePrice?: number;
  description?: string;
  supplierUrl?: string;
  supplierProductId?: string;
}

export interface RegenerateApparelItemRequest {
  generationPrompt?: string;
  generationProvider?: GenerationProvider;
}

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

export enum ItemSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL'
}

// Person Rendering Types
export interface PersonRendering {
  id: string;
  designId: string;
  personImgUrl: string;
  description?: string;
  targetAudience?: string;
  generationPrompt?: string;
  generationProvider?: GenerationProvider;
  generationTimeMs?: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt?: string;
}

// Pantone Color Types
export interface PantoneColor {
  id: string;
  name: string;
  pantoneCode: string;
  hex: string;
  rgbR: number;
  rgbG: number;
  rgbB: number;
  cmykC?: number;
  cmykM?: number;
  cmykY?: number;
  cmykK?: number;
  description?: string;
  colorFamily?: ColorFamily;
  isMetallic: boolean;
  isFluorescent: boolean;
  createdAt: string;
  updatedAt: string;
  rgbString?: string;
  cmykString?: string;
}

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

// Filter and Query Types
export interface JobFilters {
  status?: JobStatus;
  industry?: string;
  targetAudience?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DesignFilters {
  designStyle?: string;
  generationProvider?: GenerationProvider;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApparelFilters {
  itemType?: ItemType;
  itemSize?: ItemSize;
  isOnSale?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ColorFilters {
  colorFamily?: ColorFamily;
  search?: string;
  isMetallic?: boolean;
  isFluorescent?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Webhook Types
export interface WebhookEvent {
  event: string;
  timestamp: string;
  data: any;
}

export enum WebhookEventType {
  JOB_COMPLETED = 'job.completed',
  JOB_FAILED = 'job.failed',
  DESIGN_GENERATED = 'design.generated',
  APPAREL_GENERATED = 'apparel.generated'
}

// Rate Limiting Types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

// Health Check Types
export interface HealthCheck {
  service: string;
  status: 'healthy' | 'unhealthy';
  error?: string;
}

export interface HealthResponse {
  success: boolean;
  data: {
    status: 'healthy' | 'unhealthy';
    checks: HealthCheck[];
    timestamp: string;
  };
}
