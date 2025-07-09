import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const withBasePath = (path: string) => {
  const basePath =  process.env.NODE_ENV === 'production' ? '/next-project-site' : ''
  return `${ basePath || ''}${path}`;
};
