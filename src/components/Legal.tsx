import React from 'react';
import { FooterLinkProps, FooterLinksProps } from './FooterTypes';

const FooterLink = ({ link, children }: FooterLinkProps) => (
  <a
    href={link}
    className="text-[var(--secondary-link-color)] hover:text-[var(--link-hover)] transition-colors text-sm"
  >
    {children}
  </a>
);

const FooterLinks = ({ links, className = ''}: FooterLinksProps) => {
  if (!links || !Array.isArray(links)) {
    return null;
  }

  return (
    <ul className={`flex flex-row flex-wrap space-x-4 gap-y-2 mt-2 md:mt-0 ${className}`}>
      {links.map(({ link, text }) => (
        <li key={link}>
          <FooterLink link={link}>{text}</FooterLink>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;