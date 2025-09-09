// Base Entity Class
export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;

  constructor() {
    this.id = this.generateUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isDeleted = false;
  }

  abstract validate(): boolean;
  abstract softDelete(): void;

  protected generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// User Entity
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

  constructor() {
    super();
    this.emailVerified = false;
    this.failedLoginAttempts = 0;
    this.provider = 'local';
    this.role = 'user';
    this.isActive = true;
  }

  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  get displayName(): string {
    return this.fullName || this.username;
  }

  validatePassword(password: string): boolean {
    // This would typically use bcrypt or similar
    // For now, just a placeholder
    return !!password;
  }

  hashPassword(password: string): string {
    // This would typically use bcrypt or similar
    // For now, just a placeholder
    return password;
  }

  generateResetToken(): string {
    return this.generateUUID();
  }

  isAccountLocked(): boolean {
    return this.failedLoginAttempts >= 5;
  }

  validate(): boolean {
    return !!(this.username && this.email && this.role);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Job Entity
export class Job extends BaseEntity {
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
  status: string;
  currentStep?: string;
  progress: number;
  errorMessage?: string;
  analysisResult?: any;
  completedAt?: Date;

  constructor() {
    super();
    this.useExistingCompanyLogo = false;
    this.useUploadedImage = false;
    this.designStyles = [];
    this.designElements = [];
    this.accentColors = [];
    this.fonts = [];
    this.status = 'pending';
    this.progress = 0;
  }

  get isCompleted(): boolean {
    return this.status === 'completed';
  }

  get isFailed(): boolean {
    return this.status === 'failed';
  }

  get isProcessing(): boolean {
    return this.status === 'processing';
  }

  get duration(): number | null {
    if (!this.completedAt) return null;
    return this.completedAt.getTime() - this.createdAt.getTime();
  }

  startProcessing(): void {
    this.status = 'processing';
    this.progress = 0;
    this.currentStep = 'Starting processing';
    this.updatedAt = new Date();
  }

  updateProgress(step: string, progress: number): void {
    this.currentStep = step;
    this.progress = Math.min(100, Math.max(0, progress));
    this.updatedAt = new Date();
  }

  completeJob(result?: any): void {
    this.status = 'completed';
    this.progress = 100;
    this.completedAt = new Date();
    this.analysisResult = result;
    this.updatedAt = new Date();
  }

  failJob(error: string): void {
    this.status = 'failed';
    this.errorMessage = error;
    this.updatedAt = new Date();
  }

  validate(): boolean {
    return !!(this.userId && this.siteUrl);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Design Entity
export class Design extends BaseEntity {
  jobId: string;
  designImgUrl: string;
  aspectRatio: string;
  prompt: string;
  negativePrompt?: string;
  designStyle?: string;
  designElements: string[];
  accentColors: string[];
  fonts: string[];
  generationProvider?: string;
  generationModel?: string;
  generationTimeMs?: number;
  generationCost?: number;

  constructor() {
    super();
    this.aspectRatio = '1:1';
    this.designElements = [];
    this.accentColors = [];
    this.fonts = [];
  }

  regenerate(prompt: string, provider: string): Design {
    const newDesign = new Design();
    newDesign.jobId = this.jobId;
    newDesign.prompt = prompt;
    newDesign.generationProvider = provider;
    newDesign.designElements = this.designElements;
    newDesign.accentColors = this.accentColors;
    newDesign.fonts = this.fonts;
    return newDesign;
  }

  updatePrompt(prompt: string): void {
    this.prompt = prompt;
    this.updatedAt = new Date();
  }

  validate(): boolean {
    return !!(this.jobId && this.designImgUrl && this.prompt);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Pantone Color Entity
export class PantoneColor extends BaseEntity {
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
  colorFamily?: string;
  isMetallic: boolean;
  isFluorescent: boolean;

  constructor() {
    super();
    this.isMetallic = false;
    this.isFluorescent = false;
  }

  get rgbString(): string {
    return `rgb(${this.rgbR}, ${this.rgbG}, ${this.rgbB})`;
  }

  get cmykString(): string {
    if (this.cmykC === undefined || this.cmykM === undefined || 
        this.cmykY === undefined || this.cmykK === undefined) {
      return '';
    }
    return `cmyk(${this.cmykC}%, ${this.cmykM}%, ${this.cmykY}%, ${this.cmykK}%)`;
  }

  get hslValues(): { h: number; s: number; l: number } {
    return this.rgbToHsl(this.rgbR, this.rgbG, this.rgbB);
  }

  toHex(): string {
    return this.hex;
  }

  toRgb(): { r: number; g: number; b: number } {
    return { r: this.rgbR, g: this.rgbG, b: this.rgbB };
  }

  toCmyk(): { c: number; m: number; y: number; k: number } {
    return {
      c: this.cmykC || 0,
      m: this.cmykM || 0,
      y: this.cmykY || 0,
      k: this.cmykK || 0
    };
  }

  toHsl(): { h: number; s: number; l: number } {
    return this.rgbToHsl(this.rgbR, this.rgbG, this.rgbB);
  }

  getContrastColor(): string {
    // Calculate luminance to determine if we need light or dark text
    const luminance = (0.299 * this.rgbR + 0.587 * this.rgbG + 0.114 * this.rgbB) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  private rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  validate(): boolean {
    return !!(this.name && this.pantoneCode && this.hex && 
              this.rgbR >= 0 && this.rgbR <= 255 &&
              this.rgbG >= 0 && this.rgbG <= 255 &&
              this.rgbB >= 0 && this.rgbB <= 255);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Apparel Item Entity
export class ApparelItem extends BaseEntity {
  designId: string;
  pantoneColorId?: string;
  itemType: string;
  itemSize?: string;
  apparelImgUrl1?: string;
  apparelImgUrl2?: string;
  apparelImgUrl3?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  supplierUrl?: string;
  supplierProductId?: string;
  generationPrompt?: string;
  generationProvider?: string;
  generationTimeMs?: number;

  get currentPrice(): number {
    return this.salePrice || this.price || 0;
  }

  get isOnSale(): boolean {
    return !!(this.salePrice && this.price && this.salePrice < this.price);
  }

  get discountAmount(): number {
    if (!this.isOnSale) return 0;
    return (this.price || 0) - (this.salePrice || 0);
  }

  get discountPercentage(): number {
    if (!this.isOnSale || !this.price) return 0;
    return (this.discountAmount / this.price) * 100;
  }

  regenerate(prompt: string): ApparelItem {
    const newItem = new ApparelItem();
    newItem.designId = this.designId;
    newItem.pantoneColorId = this.pantoneColorId;
    newItem.itemType = this.itemType;
    newItem.itemSize = this.itemSize;
    newItem.description = this.description;
    newItem.price = this.price;
    newItem.salePrice = this.salePrice;
    newItem.supplierUrl = this.supplierUrl;
    newItem.supplierProductId = this.supplierProductId;
    newItem.generationPrompt = prompt;
    return newItem;
  }

  updatePricing(price: number, salePrice?: number): void {
    this.price = price;
    if (salePrice !== undefined) {
      this.salePrice = salePrice;
    }
    this.updatedAt = new Date();
  }

  validate(): boolean {
    return !!(this.designId && this.itemType);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Person Rendering Entity
export class PersonRendering extends BaseEntity {
  designId: string;
  personImgUrl: string;
  description?: string;
  targetAudience?: string;
  generationPrompt?: string;
  generationProvider?: string;
  generationTimeMs?: number;

  regenerate(prompt: string): PersonRendering {
    const newRendering = new PersonRendering();
    newRendering.designId = this.designId;
    newRendering.description = this.description;
    newRendering.targetAudience = this.targetAudience;
    newRendering.generationPrompt = prompt;
    return newRendering;
  }

  validate(): boolean {
    return !!(this.designId && this.personImgUrl);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// User Session Entity
export class UserSession extends BaseEntity {
  userId: string;
  sessionToken: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;

  constructor() {
    super();
    this.isActive = true;
  }

  get isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  get isValid(): boolean {
    return this.isActive && !this.isExpired;
  }

  extendSession(duration: number): void {
    this.expiresAt = new Date(Date.now() + duration);
    this.updatedAt = new Date();
  }

  invalidate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  refreshToken(): string {
    this.sessionToken = this.generateUUID();
    this.updatedAt = new Date();
    return this.sessionToken;
  }

  validate(): boolean {
    return !!(this.userId && this.sessionToken && this.expiresAt);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// API Key Entity
export class ApiKey extends BaseEntity {
  userId: string;
  name: string;
  keyHash: string;
  permissions: string[];
  isActive: boolean;
  lastUsedAt?: Date;
  expiresAt?: Date;

  constructor() {
    super();
    this.isActive = true;
    this.permissions = [];
  }

  get isExpired(): boolean {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  get isValid(): boolean {
    return this.isActive && !this.isExpired;
  }

  generateKey(): string {
    return this.generateUUID();
  }

  validatePermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  updateLastUsed(): void {
    this.lastUsedAt = new Date();
    this.updatedAt = new Date();
  }

  revoke(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  validate(): boolean {
    return !!(this.userId && this.name && this.keyHash);
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Audit Log Entity
export class AuditLog extends BaseEntity {
  userId?: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;

  logAction(action: string, resourceType: string, resourceId: string, details: any): void {
    this.action = action;
    this.resourceType = resourceType;
    this.resourceId = resourceId;
    this.details = details;
    this.createdAt = new Date();
  }

  getAuditTrail(resourceType: string, resourceId: string): AuditLog[] {
    // This would typically query the database
    // For now, just return empty array
    return [];
  }

  validate(): boolean {
    return !!this.action;
  }

  softDelete(): void {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}

// Job Pantone Color Junction Entity
export class JobPantoneColor {
  jobId: string;
  pantoneColorId: string;
  createdAt: Date;

  constructor(jobId: string, pantoneColorId: string) {
    this.jobId = jobId;
    this.pantoneColorId = pantoneColorId;
    this.createdAt = new Date();
  }
}
