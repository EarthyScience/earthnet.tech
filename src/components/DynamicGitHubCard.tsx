'use client'

import { useEffect, useState } from "react";
import { GitHubCard } from "@/components/GithubCard";
import  repoLoader  from '@/utils/repoData';
import { RepoCardData } from "@/utils/repoData";

interface Props {
  repoUrl: string;
}

export const DynamicGitHubCard = ({ repoUrl }: Props) => {
  const [repo, setRepo] = useState<RepoCardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await repoLoader.load(repoUrl);
        setRepo(data);
      } catch {
        setError("Error loading repository data");
      }
    })();
  }, [repoUrl]);

  if (error) return <p>{error}</p>;
  if (!repo) return <p>Loading...</p>;

  return <GitHubCard {...repo} />;
};