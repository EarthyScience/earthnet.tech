import React from 'react';
import { AddressProps } from './FooterTypes';

const LocationIcon = () => (
  <svg
    height="24"
    width="24"
    viewBox="0 0 16 16"
    strokeLinejoin="round"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.33 6.67c0 3.328-3.693 6.795-4.933 7.866a0.667 0.667 0 0 1-0.801 0C6.356 13.465 2.663 10 2.663 6.67a5.333 5.333 0 0 1 10.667 0M8 4.67a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
      fill="currentColor"
    />
  </svg>
);

const Address = ({ address, title = '' }: AddressProps) => {
  const { company, street, zip, city, state, country } = address;

  const hasLocation = Boolean(company || street || zip || city || state || country);

  if (!hasLocation) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
        <LocationIcon />
        {title}
      </h3>
      <address className="not-italic text-sm text-[var(--secondary-link-color)]">
        {company && (
          <>
            {company}<br />
          </>
        )}
        {street && (
          <>
            {street}<br />
          </>
        )}
        {(zip || city || state) && (
          <>
            {zip}{zip && (city || state) ? ' ' : ''}
            {city}{city && state ? ', ' : ''}
            {state}<br />
          </>
        )}
        {country && country}
      </address>
    </div>
  );
};

export default Address;