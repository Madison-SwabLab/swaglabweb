import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobStore } from '@/store/jobStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { cn } from '@/utils/cn';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentJob, isLoading, error, fetchJob } = useJobStore();

  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id, fetchJob]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !currentJob) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Job Not Found</h2>
          <p className="text-slate-400 mb-6">
            {error || 'The job you are looking for does not exist.'}
          </p>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"/>
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {currentJob.brandName || 'Job Details'}
            </h1>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium',
              currentJob.status === 'pending' && 'status-pending',
              currentJob.status === 'processing' && 'status-processing',
              currentJob.status === 'completed' && 'status-completed',
              currentJob.status === 'failed' && 'status-failed',
              currentJob.status === 'cancelled' && 'status-cancelled',
            )}>
              {currentJob.status}
            </span>
          </div>
          <p className="text-slate-400">
            Created on {new Date(currentJob.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Progress Bar */}
        {currentJob.progress > 0 && currentJob.progress < 100 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <span>{currentJob.currentStep || 'Processing...'}</span>
              <span>{currentJob.progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-brand-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentJob.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Job Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Job Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400">Website URL</label>
                  <p className="text-white">{currentJob.siteUrl}</p>
                </div>
                {currentJob.brandName && (
                  <div>
                    <label className="text-sm text-slate-400">Brand Name</label>
                    <p className="text-white">{currentJob.brandName}</p>
                  </div>
                )}
                {currentJob.industry && (
                  <div>
                    <label className="text-sm text-slate-400">Industry</label>
                    <p className="text-white">{currentJob.industry}</p>
                  </div>
                )}
                {currentJob.targetAudience && (
                  <div>
                    <label className="text-sm text-slate-400">Target Audience</label>
                    <p className="text-white">{currentJob.targetAudience}</p>
                  </div>
                )}
              </div>
            </div>

            {currentJob.brandPersonality && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Brand Personality</h3>
                <p className="text-slate-300">{currentJob.brandPersonality}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {currentJob.designStyles && currentJob.designStyles.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Design Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.designStyles.map((style, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-sm"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentJob.accentColors && currentJob.accentColors.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Accent Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.accentColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800"
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-sm text-slate-300">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentJob.fonts && currentJob.fonts.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Fonts</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.fonts.map((font, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm"
                    >
                      {font}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {currentJob.status === 'pending' && (
            <button className="btn-primary">
              Start Processing
            </button>
          )}
          {currentJob.status === 'processing' && (
            <button className="btn-secondary">
              Cancel Job
            </button>
          )}
          {currentJob.status === 'completed' && (
            <Link to={`/designs/${currentJob.id}`} className="btn-primary">
              View Designs
            </Link>
          )}
          {currentJob.status === 'failed' && (
            <button className="btn-primary">
              Retry Job
            </button>
          )}
          <button className="btn-secondary">
            Edit Job
          </button>
        </div>

        {/* Error Message */}
        {currentJob.errorMessage && (
          <div className="mt-8 rounded-md bg-red-500/10 border border-red-500/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-400">
                  Error
                </h3>
                <p className="mt-1 text-sm text-red-300">
                  {currentJob.errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
