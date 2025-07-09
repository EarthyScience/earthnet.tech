import React from 'react';

interface ContentSplitSectionProps {
  title?: string;
  titleFontSize?: string;
  subtitle?: string;
  media?: React.ReactNode | null;
  mediaPosition?: 'left' | 'right';
  layout?: 'balanced' | 'text-emphasis' | 'media-emphasis';
  shadow?: boolean;
}

const ContentSplitSection = ({
  title = "Welcome to Our template",
  titleFontSize = 'text-3xl px-2 md:text-4xl lg:text-5xl',
  subtitle = "Discover amazing features that will transform your experience",
  media,
  mediaPosition = 'right',
  layout = 'balanced',
  shadow = false,
}: ContentSplitSectionProps) => {
  // Determine width classes based on layout
  const widthClasses = {
    'balanced': ['md:w-1/2', 'md:w-1/2'],
    'text-emphasis': ['md:w-2/3', 'md:w-1/3'],
    'media-emphasis': ['md:w-1/3', 'md:w-2/3'],
  };

  const [textWidth, mediaWidth] = widthClasses[layout];

  // Create content sections
  const textContent = (
    <div className={`${textWidth} space-y-4 mb-8 md:mb-0 md:mx-8`}>
      <h1 className={`${titleFontSize} font-bold leading-tight`}>
        {title}
      </h1>
      <p className="text-lg md:text-xl">
        {subtitle}
      </p>
    </div>
  );

  const mediaContent = (
    <div className={`${mediaWidth} flex justify-center md:mx-8`}>
      {media || (
        <div className="rounded-lg h-64 w-full flex items-center justify-center">
          <p>Place your image or component here</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full rounded-lg overflow-hidden ${shadow ? 'shadow-xl' : ''}`}>
      <div className="mx-auto py-2 md:py-2 flex flex-col md:flex-row items-center">
        {mediaPosition === 'left' ? (
          <>
            {mediaContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {mediaContent}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentSplitSection;
