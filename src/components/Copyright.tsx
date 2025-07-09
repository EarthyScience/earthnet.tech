import React from 'react';

interface CopyrightProps {
  text: string;
}

export const Copyright = ({ text }: CopyrightProps) => (
  <p className="text-sm text-[var(--secondary-link-color)]">
    &copy; {new Date().getFullYear()} {text}
  </p>
);

export default Copyright;