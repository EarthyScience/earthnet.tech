"use client"
import { useRef } from 'react';
import Image from 'next/image';
import { GiBrain } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, 
  FaFacebook, FaGlobe
} from 'react-icons/fa';
import ProtectedEmail from './ProtectedEmail';
import './CardProfile.css'

// Predefined icon mapping
const SOCIAL_ICONS: { [key: string]: React.ComponentType<{ size?: number }> } = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  website: FaGlobe,
};

interface SocialLink {
  icon: string;
  link: string | null;
}

interface Description {
  [key: string]: string;
}

interface CardProfileProps {
  name: string;
  identifier: string;
  photo?: string | null;
  email: string;
  partner: string;
  socials?: SocialLink[];
  description: Description;
}

export const CardProfile = ({
  name,
  identifier,
  photo = null,
  email,
  partner,
  socials = [],
  description,
}: CardProfileProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div key={`${partner}-${name}`}  className="card">
        <div className="imgBx">
          {photo === null ? (
            <div className="flex justify-center py-8">
              <GiBrain size={54} />
            </div>
          ) : (
            <Image src={photo} alt={name} width={500} height={500} />
          )}
        </div>

        <div ref={contentRef} className="content">
          <div className="details">
            <h2>
              {name} <br /> <span>{identifier}</span>
            </h2>
            <div className="email-container">
              <div className="icon-container">
                <MdEmail size={22} />
              </div>
              <div >
                <ProtectedEmail email={email} />
              </div>
            </div>
            <br />
            {socials.length > 0 && (
              <div className="socials">
                {socials.map((item) => {
                  // Use the id to look up the icon, fallback to a default if not found
                  const IconComponent = SOCIAL_ICONS[item.icon] || FaGlobe;

                  return (
                    item.link !== null && (
                      <a 
                        key={item.icon} 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <IconComponent size={22} />
                      </a>
                    )
                  );
                })}
              </div>
            )}
            <div className="description">
              <ul>
                {Object.entries(description).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};