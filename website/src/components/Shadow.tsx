import React from 'react';
export const Shadow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.04)',
          borderRadius: '16px',
          overflow: 'hidden',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
};
