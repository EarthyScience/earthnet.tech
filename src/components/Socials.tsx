import { IconType } from 'react-icons';

interface SocialLink {
    icon: IconType;
    link: string;
    label?: string;
  }
  
  interface SocialsProps {
    socialLinks: SocialLink[];
  }
const Socials = ({ socialLinks }: SocialsProps) => {
    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-center gap-2">
          {socialLinks.map(({ icon: Icon, link }, index) => (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    );
  };

export default Socials;
