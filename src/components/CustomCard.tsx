import { Heart } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentType } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type CustomCardProps = {
  title: string;
  description: string;
  href: string;
  target?: string;
  avatarSrc?: string | null;
  avatarFallback?: string;
  showIcon?: boolean;
  icon?: ComponentType<{ size?: number; className?: string }>;
  iconSize?: number;
  className?: string;
};

export const CustomCard = ({
  title,
  description,
  href,
  target = "_blank",
  avatarSrc = null,
  avatarFallback = "CN",
  showIcon = false,
  icon: IconComponent = Heart,
  iconSize = 24,
  className = "",
}: CustomCardProps) => {
  return (
    <Card className={`w-full max-w-sm mx-auto min-w-0 hover:shadow-md transition-shadow duration-200 ${className}`}>
      <CardHeader>
        {/* Avatar and Title row */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
          {/* Avatar or Icon on the left */}
          {avatarSrc ? (
            <div className="border-[1.5px] border-gray-300 rounded-full p-0.5">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src={avatarSrc} alt="Avatar" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </div>
          ) : showIcon && IconComponent ? (
            <div className="flex-shrink-0">
              <IconComponent size={iconSize} className="text-gray-400" />
            </div>
          ) : null}
          
          {/* Title on the right */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm sm:text-base md:text-lg leading-tight">
              {href ? (
                <a href={href} target={target} className="hover:underline inline-flex items-center gap-2">
                  {title}
                  <FaExternalLinkAlt size={12} className="flex-shrink-0 opacity-60" />
                </a>
              ) : (
                title
              )}
            </CardTitle>
          </div>
        </div>
        
        {/* Description spans full width */}
        <CardDescription className="mt-1">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export const CustomCardHorizontal = ({
  title,
  description,
  href,
  target = "_blank",
  avatarSrc = null,
  avatarFallback = "CN",
  showIcon = false,
  icon: IconComponent = Heart,
  iconSize = 24,
  className = "",
}: CustomCardProps) => {
  return (
    <Card className={`w-full max-w-sm mx-auto min-w-0 hover:shadow-md transition-shadow duration-200 ${className}`}>
  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-3 -mt-4 sm:mt-0 pb-0">
    {/* Image Section — responsive positioning */}
    <div className="flex justify-center sm:block">
      {avatarSrc ? (
        <Avatar className="h-24 w-24 rounded-md shadow-md">
          <AvatarImage src={avatarSrc} alt="Avatar" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      ) : showIcon && IconComponent ? (
        <div className="w-24 h-24 flex items-center justify-center rounded-md bg-gray-100 shadow-md">
          <IconComponent size={iconSize} className="text-gray-500" />
        </div>
      ) : null}
    </div>

    {/* Content Section — always left aligned */}
    <div className="flex-1 text-left">
      <CardTitle className="text-lg font-semibold">
        {href ? (
          <a href={href} target={target} className="inline-flex items-center gap-2 hover:underline">
            {title}
            <FaExternalLinkAlt size={12} className="opacity-60" />
          </a>
        ) : (
          title
        )}
      </CardTitle>
      <CardDescription className="text-sm mt-1">
        {description}
      </CardDescription>
    </div>
  </div>
</Card>
  );
}
