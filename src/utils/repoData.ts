export interface RepoCardData {
  name: string;
  description: string;
  language: string;
  forks: number;
  stars: number;
  lastUpdated: string;
}

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
}

interface GitHubFetchOptions {
  authorization?: string;
  accept?: string;
}

function formatLastUpdated(dateString: string): string {
  const updatedDate = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil(Math.abs(now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month(s) ago`;
  return `${Math.floor(diffDays / 365)} year(s) ago`;
}

async function github(
  path: string,
  {
    authorization = process.env.GITHUB_TOKEN && `token ${process.env.GITHUB_TOKEN}`,
    accept = "application/vnd.github.v3+json"
  }: GitHubFetchOptions = {}
): Promise<GitHubRepoResponse> {
  const url = new URL(path, "https://api.github.com");
  const headers: Record<string, string> = {
    accept,
    ...(authorization && { authorization })
  };

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    throw new Error(`fetch error: ${response.status} ${url.toString()}`);
  }

  return await response.json();
}

const repoLoader = {
  async load(repoUrl: string): Promise<RepoCardData> {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error("Invalid GitHub repository URL");

    const [, owner, repo] = match;
    const repoFullName = `${owner}/${repo}`;

    try {
      const repoData = await github(`/repos/${repoFullName}`);
      return {
        name: repoData.name,
        description: repoData.description || "No description provided",
        language: repoData.language || "Unknown",
        forks: repoData.forks_count,
        stars: repoData.stargazers_count,
        lastUpdated: formatLastUpdated(repoData.updated_at)
      };
    } catch (error) {
      if (process.env.CI) throw error;
      return {
        name: repo,
        description: "Repository data unavailable",
        language: "Unknown",
        forks: 0,
        stars: 0,
        lastUpdated: "unknown"
      };
    }
  }
};

export default repoLoader;
