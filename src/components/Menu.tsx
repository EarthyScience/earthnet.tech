'use client'

import { useState } from 'react'
import LogoProject from './Logo'
import ThemeToggle from '@/components/ThemeToggle'
import Socials from '@/components/Socials'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import { navigation } from '@/config/nav'
import { socialLinks } from '@/utils/socials'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const handleLinkClick = () => {
      setIsOpen(false)
    }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)] z-50">
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--card)] fixed inset-0 top-12 overflow-y-auto">
          <div className="pt-2 px-8 pb-3 space-y-1">
            <MobileMenu items={navigation} onLinkClick={handleLinkClick} />
          </div>
          <Socials socialLinks={socialLinks} />
        </div>
      )}
    </nav>
  )
}
