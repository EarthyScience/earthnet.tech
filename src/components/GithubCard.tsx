import React from 'react';
import { Star, GitFork, Calendar } from 'lucide-react';
import { RiGitRepositoryLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GitHubCard({
  name = "awesome-project",
  description = "A fantastic open-source project that solves real-world problems with elegant code and comprehensive documentation.",
  language = "Julia",
  forks = 2718,
  stars = 1618,
  lastUpdated = "now",
  href = "#"
}) {
  // Language color mapping (common GitHub language colors)
  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    Julia: '#a270ba',
    'Jupyter Notebook': '#DA5B0B',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#239120',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Shell: '#89e051',
    Vue: '#2c3e50',
    React: '#61dafb'
  }

  const languageColor = languageColors[language] || '#696358ff';

  return (
    <Card className="w-full max-w-sm mx-auto min-w-0 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 sm:pb-3 -mt-3">
        {/* Repository Name and Star Button */}
        <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
          <a 
              href={href} 
              className="flex items-center gap-2 cursor-pointer min-w-0 flex-1"
              target="_blank"
              rel="noopener noreferrer"
            >

          <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-semibold cursor-pointer min-w-0 flex-1 overflow-hidden">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <RiGitRepositoryLine className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <span className="truncate min-w-0 flex-shrink max-w-sm">{name}</span>
          </CardTitle>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex items-center gap-1 text-xs px-2 py-1 sm:px-3 sm:py-1.5 flex-shrink-0 cursor-pointer h-7 sm:h-8 hover:[color:var(--accent-3)] transition-colors duration-200"
          >
            <Star size={10} className="sm:w-3 sm:h-3" />
            <span className="hidden xs:inline sm:inline">Star us!</span>
            <span className="xs:hidden sm:hidden">us!</span>
          </Button>
          
          </a>
        </div>

        {/* Description */}
        <CardDescription className="text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 -mt-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 pb-3 sm:pb-4 -mt-6 -mb-6">
        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          {/* Language */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: languageColor }}
            />
            <span className="text-xs sm:text-sm text-gray-600 truncate">{language}</span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 min-w-0">
            {/* Stars */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star size={12} className="sm:w-3.5 sm:h-3.5" />
              <span>{stars.toLocaleString()}</span>
            </div>

            {/* Forks */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <GitFork size={12} className="sm:w-3.5 sm:h-3.5" />
              <span>{forks.toLocaleString()}</span>
            </div>

            {/* Last Updated - Hide on very small screens */}
            <div className="hidden xs:flex sm:flex items-center gap-1 min-w-0">
              <Calendar size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
              <span className="truncate text-xs">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Last Updated - Show on very small screens only */}
        <div className="flex xs:hidden sm:hidden items-center gap-1 mt-2 text-xs text-gray-500">
          <Calendar size={10} className="flex-shrink-0" />
          <span className="truncate">Updated {lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  );
};