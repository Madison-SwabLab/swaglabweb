import { create } from 'zustand';
import { Job, CreateJobRequest, UpdateJobRequest, JobFilters, JobProgress } from '@/types/api';
import { apiClient } from '@/services/apiClient';

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
  filters: JobFilters;
}

interface JobActions {
  fetchJobs: (filters?: JobFilters) => Promise<void>;
  fetchJob: (id: string) => Promise<void>;
  createJob: (jobData: CreateJobRequest) => Promise<Job>;
  updateJob: (id: string, jobData: UpdateJobRequest) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  startJob: (id: string) => Promise<void>;
  cancelJob: (id: string) => Promise<void>;
  getJobProgress: (id: string) => Promise<JobProgress>;
  setFilters: (filters: JobFilters) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setCurrentJob: (job: Job | null) => void;
}

type JobStore = JobState & JobActions;

export const useJobStore = create<JobStore>((set, get) => ({
  // State
  jobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
  pagination: null,
  filters: {},

  // Actions
  fetchJobs: async (filters?: JobFilters) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = filters || get().filters;
      const response = await apiClient.getJobs(currentFilters);
      set({ 
        jobs: response.items, 
        pagination: response.pagination,
        filters: currentFilters,
        isLoading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch jobs',
        isLoading: false 
      });
      throw error;
    }
  },

  fetchJob: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const job = await apiClient.getJob(id);
      set({ 
        currentJob: job, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch job',
        isLoading: false 
      });
      throw error;
    }
  },

  createJob: async (jobData: CreateJobRequest) => {
    set({ isLoading: true, error: null });
    try {
      const job = await apiClient.createJob(jobData);
      set(state => ({ 
        jobs: [job, ...state.jobs],
        currentJob: job,
        isLoading: false,
        error: null 
      }));
      return job;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create job',
        isLoading: false 
      });
      throw error;
    }
  },

  updateJob: async (id: string, jobData: UpdateJobRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedJob = await apiClient.updateJob(id, jobData);
      set(state => ({
        jobs: state.jobs.map(job => job.id === id ? updatedJob : job),
        currentJob: state.currentJob?.id === id ? updatedJob : state.currentJob,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update job',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteJob: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteJob(id);
      set(state => ({
        jobs: state.jobs.filter(job => job.id !== id),
        currentJob: state.currentJob?.id === id ? null : state.currentJob,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete job',
        isLoading: false 
      });
      throw error;
    }
  },

  startJob: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedJob = await apiClient.startJob(id);
      set(state => ({
        jobs: state.jobs.map(job => job.id === id ? updatedJob : job),
        currentJob: state.currentJob?.id === id ? updatedJob : state.currentJob,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to start job',
        isLoading: false 
      });
      throw error;
    }
  },

  cancelJob: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedJob = await apiClient.cancelJob(id);
      set(state => ({
        jobs: state.jobs.map(job => job.id === id ? updatedJob : job),
        currentJob: state.currentJob?.id === id ? updatedJob : state.currentJob,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to cancel job',
        isLoading: false 
      });
      throw error;
    }
  },

  getJobProgress: async (id: string) => {
    try {
      const progress = await apiClient.getJobProgress(id);
      return progress;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to get job progress'
      });
      throw error;
    }
  },

  setFilters: (filters: JobFilters) => {
    set({ filters });
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setCurrentJob: (job: Job | null) => {
    set({ currentJob: job });
  },
}));
