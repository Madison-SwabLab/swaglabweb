import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const HomePageSimple: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>SwagLab.ai</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        AI‑powered merch design at scale — instant, professional, limitless.
      </p>
      <p style={{ marginBottom: '2rem' }}>
        SwagLab.ai eliminates design bottlenecks by automatically generating unique, brand‑ready apparel collections in seconds so merch companies can focus on selling and fulfilling orders.
      </p>
      <div style={{ marginBottom: '2rem' }}>
        {isAuthenticated ? (
          <Link to="/dashboard" style={{ 
            display: 'inline-block', 
            padding: '12px 24px', 
            background: '#2a98ff', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px' 
          }}>
            Go to Dashboard
          </Link>
        ) : (
          <div>
            <Link to="/login" style={{ 
              display: 'inline-block', 
              padding: '12px 24px', 
              background: '#2a98ff', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              marginRight: '10px'
            }}>
              Login
            </Link>
            <Link to="/register" style={{ 
              display: 'inline-block', 
              padding: '12px 24px', 
              background: 'transparent', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              border: '1px solid #334155'
            }}>
              Register
            </Link>
          </div>
        )}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Features</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>• Unlimited creativity</li>
          <li style={{ marginBottom: '0.5rem' }}>• Brand‑safe outputs</li>
          <li style={{ marginBottom: '0.5rem' }}>• Collaboration tools</li>
          <li style={{ marginBottom: '0.5rem' }}>• Exports that ship</li>
        </ul>
      </div>
    </div>
  );
};
