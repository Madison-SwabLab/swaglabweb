import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const DesignPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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
            <h1 className="text-3xl font-bold text-white">Designs</h1>
          </div>
          <p className="text-slate-400">
            AI-generated designs for your merch collection
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 rounded-full bg-slate-800 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-12 w-12 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Designs Coming Soon</h3>
          <p className="text-slate-400 mb-6">
            This page will display your AI-generated designs and allow you to manage your collection.
          </p>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
