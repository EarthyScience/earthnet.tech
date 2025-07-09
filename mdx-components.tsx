import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import { CardProfile } from '@/components/CardProfile';
import { CopyButton } from '@/components/copy-button';

// Type definitions
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
// type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type WPProps = {
  number: number;
  children: React.ReactNode;
};

interface TableData {
  headers: string[];
  rows: string[][];
}

// Utility functions
function slugify(str: { toString: () => string; }) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

// Custom components
const WP = ({ number, children }: WPProps) => {
  const style = {
    color: `var(--var-wp-${number})`,
    fontWeight: 'bold',
  };
  return <span style={style}>{children}</span>;
};

function RoundedImage(props: ImageProps) {
  const { alt, ...rest } = props;
  return <Image alt={alt} className="rounded-lg" {...rest} />;
}

function Table({ data }: { data: TableData }) {
  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Custom link component with support for internal/external links
function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;
  
  if (href && href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }
  
  if (href && href.startsWith('#')) {
    return <a {...props} />;
  }
  
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

// MDX Components for direct usage
const components = {
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-6xl mx-auto px-6 mt-8 py-8 space-y-8">
      {children}
    </div>
  ),
  h1: (props: HeadingProps) => (
    <h1 className="font-bold pt-12 mb-0" id={slugify(props.children?.toString() || '')} {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="font-bold mt-8 mb-3"
      id={slugify(props.children?.toString() || '')}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="font-bold mt-8 mb-3"
      id={slugify(props.children?.toString() || '')}
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 
      className="font-bold" 
      id={slugify(props.children?.toString() || '')} 
      {...props} 
    />
  ),
  h5: (props: HeadingProps) => (
    <h5 
      className="font-bold" 
      id={slugify(props.children?.toString() || '')} 
      {...props} 
    />
  ),
  h6: (props: HeadingProps) => (
    <h6 
      className="font-bold" 
      id={slugify(props.children?.toString() || '')} 
      {...props} 
    />
  ),
  p: (props: ParagraphProps) => (
    <p className="leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-bold" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold" {...props} />
  ),
  a: CustomLink,
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return (
    <div className="relative group">
      <pre className="overflow-x-auto">
        <CopyButton
          codeSnippet={children as string}
        />
        <code
          className="block pl-12 p-4"
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
        />
      </pre>
    </div>
  );
  },
  Image: RoundedImage,
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  Table,
  WP,
  CardProfile
};

// Type declaration
declare global {
  type MDXProvidedComponents = typeof components;
}

// Export useMDXComponents for MDX usage
export function useMDXComponents(): MDXProvidedComponents {
  return components;
}

// Export CustomMDX component for direct usage with MDXRemote
export function CustomMDX(props: React.JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}