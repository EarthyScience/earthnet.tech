'use client'

import React from 'react'

interface ProtectedEmailProps {
    email: string;
  }
  
  const ProtectedEmail = ({ email }: ProtectedEmailProps) => {
    const [username] = email.split('@');
  
    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      window.location.href = `mailto:${email}`;
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
      }
    };
  
    return (
      <span 
        onClick={handleClick} 
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className='protected-email'
        title="Click to email"
        aria-label="Send email"
      >
        {`${username}@...`}
      </span>
    );
  };
  
  export default ProtectedEmail;
  