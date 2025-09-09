import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobStore } from '@/store/jobStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { cn } from '@/utils/cn';

export const DashboardPage: React.FC = () => {
  const { jobs, isLoading, error, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Manage your AI-powered merch design jobs and collections.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Jobs', value: jobs.length, color: 'blue' },
            { label: 'Completed', value: jobs.filter(job => job.status === 'completed').length, color: 'green' },
            { label: 'Processing', value: jobs.filter(job => job.status === 'processing').length, color: 'yellow' },
            { label: 'Pending', value: jobs.filter(job => job.status === 'pending').length, color: 'gray' },
          ].map((stat, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={cn(
                  'h-12 w-12 rounded-lg flex items-center justify-center',
                  stat.color === 'blue' && 'bg-blue-500/20',
                  stat.color === 'green' && 'bg-green-500/20',
                  stat.color === 'yellow' && 'bg-yellow-500/20',
                  stat.color === 'gray' && 'bg-gray-500/20',
                )}>
                  <span className="text-2xl font-bold">
                    {stat.color === 'blue' && '📊'}
                    {stat.color === 'green' && '✅'}
                    {stat.color === 'yellow' && '⏳'}
                    {stat.color === 'gray' && '⏸️'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Job Button */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6"/>
            </svg>
            Create New Job
          </Link>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-400">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-12 w-12 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No jobs yet</h3>
            <p className="text-slate-400 mb-6">
              Get started by creating your first AI-powered merch design job.
            </p>
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6"/>
              </svg>
              Create Your First Job
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Recent Jobs</h2>
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {job.brandName || 'Untitled Job'}
                      </h3>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        job.status === 'pending' && 'status-pending',
                        job.status === 'processing' && 'status-processing',
                        job.status === 'completed' && 'status-completed',
                        job.status === 'failed' && 'status-failed',
                        job.status === 'cancelled' && 'status-cancelled',
                      )}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">
                      {job.siteUrl}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Created {new Date(job.createdAt).toLocaleDateString()}</span>
                      {job.progress > 0 && (
                        <span>{job.progress}% complete</span>
                      )}
                      {job.designsCount && (
                        <span>{job.designsCount} designs</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="btn-secondary text-sm"
                    >
                      View Details
                    </Link>
                    {job.status === 'completed' && (
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn-primary text-sm"
                      >
                        View Designs
                      </Link>
                    )}
                  </div>
                </div>
                
                {job.progress > 0 && job.progress < 100 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                      <span>{job.currentStep || 'Processing...'}</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
