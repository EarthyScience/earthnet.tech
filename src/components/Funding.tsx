import React from 'react';
import Image from 'next/image';
import { FundingProps, LogoItem } from './FooterTypes';
import { withBasePath } from '@/lib/utils';


const Logo = ({ logo }: { logo: LogoItem }) => {
  const image = (
    <Image 
      src={withBasePath(logo.src)} 
      alt={logo.alt} 
      width={logo.width}
      height={logo.height}
      className="h-8 w-auto"
      priority
    />
  );

  if (logo.href) {
    return (
      <a href={logo.href} target='_blank' rel='noopener noreferrer'>
        {image}
      </a>
    );
  }

  return image;
};

const RenderLogo = ({ logo, defaultLogoText }: { 
  logo: FundingProps['logo'], 
  defaultLogoText: string 
}) => {
  if (!logo) {
    return <>{defaultLogoText}</>;
  }

  if (Array.isArray(logo)) {
    return (
      <div className="flex items-center gap-2">
        {logo.map((item, index) => (
          <Logo key={index} logo={item} />
        ))}
      </div>
    );
  }

  if (typeof logo === 'object' && 'src' in logo) {
    return <Logo logo={logo} />;
  }

  return <>{logo}</>;
};

const Funding = ({ 
  logo, 
  description,
  className = '',
  defaultLogoText = 'LOGO'
}: FundingProps) => {
  return (
    <div className={`bg-[var(--background-funding)] ${className}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col items-left text-left">
          <div className="text-2xl font-bold text-[var(--foreground)] mb-4">
            <RenderLogo logo={logo} defaultLogoText={defaultLogoText} />
          </div>
          <div className="text-sm text-[var(--funding-text)] max-w-6xl">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;