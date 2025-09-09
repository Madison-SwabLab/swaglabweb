import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  BaseResponse, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  RefreshTokenRequest,
  User,
  Job,
  CreateJobRequest,
  UpdateJobRequest,
  JobFilters,
  Design,
  CreateDesignRequest,
  UpdateDesignRequest,
  RegenerateDesignRequest,
  ApparelItem,
  CreateApparelItemRequest,
  UpdateApparelItemRequest,
  RegenerateApparelItemRequest,
  PantoneColor,
  ColorFilters,
  PaginatedResponse,
  JobProgress,
  HealthResponse
} from '@/types/api';

export class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseURL: string = 'https://api.swaglab.ai/api') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.setupInterceptors();
    this.loadTokensFromStorage();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private loadTokensFromStorage(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post<BaseResponse<AuthResponse>>(
      `${this.baseURL}/auth/refresh`,
      { refreshToken: this.refreshToken }
    );

    if (response.data.success && response.data.data) {
      this.saveTokens(response.data.data.accessToken, this.refreshToken);
    } else {
      throw new Error('Failed to refresh token');
    }
  }

  // Authentication Methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post<BaseResponse<AuthResponse>>('/auth/login', credentials);
    if (response.data.success && response.data.data) {
      this.saveTokens(response.data.data.accessToken, response.data.data.refreshToken);
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Login failed');
  }

  async register(userData: RegisterRequest): Promise<User> {
    const response = await this.client.post<BaseResponse<User>>('/auth/register', userData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Registration failed');
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.client.post<BaseResponse<AuthResponse>>('/auth/refresh', {
      refreshToken: this.refreshToken
    });

    if (response.data.success && response.data.data) {
      this.saveTokens(response.data.data.accessToken, response.data.data.refreshToken);
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Token refresh failed');
  }

  // User Methods
  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<BaseResponse<User>>('/users/profile');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get user profile');
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    const response = await this.client.put<BaseResponse<User>>('/users/profile', userData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to update user profile');
  }

  // Job Methods
  async getJobs(filters?: JobFilters): Promise<PaginatedResponse<Job>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.client.get<BaseResponse<PaginatedResponse<Job>>>(`/jobs?${params}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get jobs');
  }

  async getJob(id: string): Promise<Job> {
    const response = await this.client.get<BaseResponse<Job>>(`/jobs/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get job');
  }

  async createJob(jobData: CreateJobRequest): Promise<Job> {
    const response = await this.client.post<BaseResponse<Job>>('/jobs', jobData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to create job');
  }

  async updateJob(id: string, jobData: UpdateJobRequest): Promise<Job> {
    const response = await this.client.put<BaseResponse<Job>>(`/jobs/${id}`, jobData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to update job');
  }

  async deleteJob(id: string): Promise<void> {
    const response = await this.client.delete<BaseResponse>(`/jobs/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to delete job');
    }
  }

  async startJob(id: string): Promise<Job> {
    const response = await this.client.post<BaseResponse<Job>>(`/jobs/${id}/start`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to start job');
  }

  async cancelJob(id: string): Promise<Job> {
    const response = await this.client.post<BaseResponse<Job>>(`/jobs/${id}/cancel`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to cancel job');
  }

  async getJobProgress(id: string): Promise<JobProgress> {
    const response = await this.client.get<BaseResponse<JobProgress>>(`/jobs/${id}/progress`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get job progress');
  }

  // Design Methods
  async getJobDesigns(jobId: string): Promise<Design[]> {
    const response = await this.client.get<BaseResponse<Design[]>>(`/jobs/${jobId}/designs`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get job designs');
  }

  async getDesign(id: string): Promise<Design> {
    const response = await this.client.get<BaseResponse<Design>>(`/designs/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get design');
  }

  async createDesign(jobId: string, designData: CreateDesignRequest): Promise<Design> {
    const response = await this.client.post<BaseResponse<Design>>(`/jobs/${jobId}/designs`, designData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to create design');
  }

  async updateDesign(id: string, designData: UpdateDesignRequest): Promise<Design> {
    const response = await this.client.put<BaseResponse<Design>>(`/designs/${id}`, designData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to update design');
  }

  async deleteDesign(id: string): Promise<void> {
    const response = await this.client.delete<BaseResponse>(`/designs/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to delete design');
    }
  }

  async regenerateDesign(id: string, regenerateData: RegenerateDesignRequest): Promise<Design> {
    const response = await this.client.post<BaseResponse<Design>>(`/designs/${id}/regenerate`, regenerateData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to regenerate design');
  }

  // Apparel Item Methods
  async getDesignApparel(designId: string): Promise<ApparelItem[]> {
    const response = await this.client.get<BaseResponse<ApparelItem[]>>(`/designs/${designId}/apparel`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get design apparel');
  }

  async getApparelItem(id: string): Promise<ApparelItem> {
    const response = await this.client.get<BaseResponse<ApparelItem>>(`/apparel/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get apparel item');
  }

  async createApparelItem(designId: string, itemData: CreateApparelItemRequest): Promise<ApparelItem> {
    const response = await this.client.post<BaseResponse<ApparelItem>>(`/designs/${designId}/apparel`, itemData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to create apparel item');
  }

  async updateApparelItem(id: string, itemData: UpdateApparelItemRequest): Promise<ApparelItem> {
    const response = await this.client.put<BaseResponse<ApparelItem>>(`/apparel/${id}`, itemData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to update apparel item');
  }

  async deleteApparelItem(id: string): Promise<void> {
    const response = await this.client.delete<BaseResponse>(`/apparel/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to delete apparel item');
    }
  }

  async regenerateApparelItem(id: string, regenerateData: RegenerateApparelItemRequest): Promise<ApparelItem> {
    const response = await this.client.post<BaseResponse<ApparelItem>>(`/apparel/${id}/regenerate`, regenerateData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to regenerate apparel item');
  }

  // Pantone Color Methods
  async getPantoneColors(filters?: ColorFilters): Promise<PaginatedResponse<PantoneColor>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.client.get<BaseResponse<PaginatedResponse<PantoneColor>>>(`/colors?${params}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get Pantone colors');
  }

  async getPantoneColor(id: string): Promise<PantoneColor> {
    const response = await this.client.get<BaseResponse<PantoneColor>>(`/colors/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to get Pantone color');
  }

  // Health Check
  async healthCheck(): Promise<HealthResponse> {
    const response = await this.client.get<HealthResponse>('/health');
    return response.data;
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.client.defaults.baseURL = baseURL;
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();
