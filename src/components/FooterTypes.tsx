import { ReactNode } from 'react';

export interface LinkItem {
  link: string;
  text: string;
}

export interface FooterProps {
  className?: string;
  columns?: number;
}

export interface FooterLinkProps {
  link: string;
  children: React.ReactNode;
}

export interface FooterLinksProps extends FooterProps {
  links: LinkItem[];
}

export interface AddressData {
  company?: string;
  street?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface AddressProps {
  address: AddressData;
  title?: string;
}

export interface ContactPerson {
  name?: string;
  position?: string;
  email?: string;
}

export interface ContactData {
  address?: AddressData;
  contacts?: ContactPerson[];
  mainEmail?: string;
}

export interface ContactsProps {
  data: ContactData;
  title?: string;
  subtitle?: string;
}

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
  width: number;
  height: number;
}

export type LogoType = LogoItem | LogoItem[] | ReactNode;
export type DescriptionType = ReactNode;

export interface FundingProps {
  logo?: LogoType;
  description: DescriptionType;
  className?: string;
  defaultLogoText?: string;
}