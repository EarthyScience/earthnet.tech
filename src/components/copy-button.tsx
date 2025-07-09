'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  codeSnippet: string;
}

export function CopyButton({ codeSnippet, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      {...props}
      onClick={handleCopy}
      className={cn(
        "rounded-md w-6 h-6 hover:bg-accent/80 flex items-center justify-center absolute bg-muted text-muted-foreground -right-1 -top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        className
      )}
    >
      {copied ? (
        <span className="absolute right-full mr-2 rounded-md bg-muted px-2 py-1 text-sm whitespace-nowrap text-muted-foreground">
          Copied!
        </span>
      ) : null}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
    </button>
  )
}