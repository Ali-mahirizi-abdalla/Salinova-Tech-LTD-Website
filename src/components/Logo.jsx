import React from 'react';
import logoImg from './logo3.jpeg';

export const Logo = ({ className, size = 36 }) => {
  return (
    <img
      src={logoImg}
      alt="Salinova Tech Logo"
      className={className}
      style={{ width: size, height: 'auto', objectFit: 'contain', borderRadius: '4px' }}
    />
  );
};
