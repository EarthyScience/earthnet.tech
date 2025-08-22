'use client'

import { useState, useEffect } from 'react'
import LogoProject from './Logo'
import ThemeToggle from '@/components/ThemeToggle'
import Socials from '@/components/Socials'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import { navigation } from '@/config/nav'
import { socialLinks } from '@/utils/socials'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)

  // Enhanced scroll lock effect
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      // Add styles to prevent background scroll while maintaining position
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Restore scroll position when menu closes
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    return () => {
      // Cleanup styles on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
      setIsOpen(false)
    }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Blur backdrop as pseudo-element */}
      <div className="absolute inset-0 bg-[var(--navbar-bg)]">
        <div className="absolute inset-0 backdrop-blur-[10px] backdrop-saturate-[180%]" />
      </div>
      
      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <div className="max-w-[1440px] mx-auto px-2 md:px-8 py-1">
          <div className="flex justify-between h-12">
            <div className="flex">
              <LogoProject icon="/logo.png" title={navigation[0]?.name || ''} />
              <div className="hidden md:ml-6 md:block py-1">
                <DesktopMenu items={navigation} />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="hidden lg:block">
                <Socials socialLinks={socialLinks} />
              </div>
              <ThemeToggle />
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[var(--secondary-link-color)] hover:text-[var(--link-hover)] hover:bg-[var(--toggle-hover)]"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu with scrolling */}
      {isOpen && (
        <div className="md:hidden bg-[var(--card)] fixed inset-0 top-12 z-40 overflow-y-auto overscroll-contain">
          <div className="pt-2 px-8 pb-3 space-y-1 min-h-[calc(100vh-3rem)]">
            <MobileMenu items={navigation} onLinkClick={handleLinkClick} />
            <div className="pt-4">
              <Socials socialLinks={socialLinks} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
