import React from 'react';
import { FooterProps } from './FooterTypes';
import FooterLinks from './Legal';
import Copyright from './Copyright';
import Address from './Address';
import Contacts from './Contacts';
import Funding from './Funding';
import ProjectFunding from '@/assets/ProjectFunding';
import { navFooter  } from '@/config/nav';
import { contactInfo } from '@/assets/contacts';
import { fundsLogos } from '@/assets/fundingLogos';
import Socials from '@/components/Socials'
import { socialLinks } from '@/utils/socials'

const Footer = ({ className = "" }: FooterProps) => {
  return (
      <footer className={`bg-[var(--navbar-bg)] border-t border-[var(--navbar-border)] ${className}`}>
          <Funding
            logo={fundsLogos}
            // description={projectText} // injecting a quoted text here will also work
            description={<ProjectFunding />}
          />
          <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Address address={contactInfo.contact.address} />
                  <Contacts data={contactInfo.contact.data} subtitle="Contact"/>
                  <Socials socialLinks={socialLinks} />
              </div>
              
              <div className="pt-2 border-t border-[var(--navbar-border)] flex flex-col md:flex-row md:justify-between">
                <Copyright text={contactInfo.copyright} />
                <FooterLinks links={navFooter} />
              </div>
          </div>
      </footer>
  );
};

export default Footer;
