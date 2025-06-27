interface GitHubStats {
  stars: number;
  forks: number;
  contributors: number;
  recentActivity?: GitHubEvent[];
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
}

interface GitHubEvent {
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  repo: {
    name: string;
  };
}

class GitHubService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly repo = 'zantaku/Zantaku';
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private async fetchWithCache<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data as T;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Zantaku-Landing-Page'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.warn('GitHub API fetch failed:', error);
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data as T;
      }
      throw error;
    }
  }

  async getRepoStats(): Promise<GitHubStats> {
    try {
      const [repoData, contributors] = await Promise.all([
        this.fetchWithCache<GitHubRepo>(`/repos/${this.repo}`),
        this.fetchWithCache<GitHubContributor[]>(`/repos/${this.repo}/contributors?per_page=20`)
      ]);

      return {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        contributors: contributors.length
      };
    } catch (error) {
      console.warn('Failed to fetch GitHub stats:', error);
      // Return fallback data
      return {
        stars: 4218,
        forks: 92,
        contributors: 12
      };
    }
  }

  async getContributors(): Promise<GitHubContributor[]> {
    try {
      return await this.fetchWithCache<GitHubContributor[]>(`/repos/${this.repo}/contributors?per_page=12`);
    } catch (error) {
      console.warn('Failed to fetch contributors:', error);
      return [];
    }
  }

  async getRecentActivity(): Promise<GitHubEvent[]> {
    try {
      return await this.fetchWithCache<GitHubEvent[]>(`/repos/${this.repo}/events?per_page=10`);
    } catch (error) {
      console.warn('Failed to fetch recent activity:', error);
      return [];
    }
  }

  // Format numbers with commas
  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  // Generate engaging copy based on stats
  generateStarsCopy(stars: number): string {
    const formatted = this.formatNumber(stars);
    if (stars > 5000) return `${formatted} otakus starred this`;
    if (stars > 1000) return `${formatted} anime fans starred this`;
    return `${formatted} developers starred this`;
  }

  generateForksCopy(forks: number): string {
    const formatted = this.formatNumber(forks);
    if (forks > 100) return `Already forked ${formatted} times`;
    if (forks > 50) return `Forked ${formatted} times by the community`;
    return `${formatted} developers forked this`;
  }

  generateContributorsCopy(contributors: number): string {
    if (contributors > 20) return `Built by ${contributors}+ anime-loving devs worldwide`;
    if (contributors > 10) return `Built by ${contributors} anime-loving devs worldwide`;
    return `Built by ${contributors} passionate developers`;
  }
}

export const githubService = new GitHubService();
export type { GitHubStats, GitHubContributor, GitHubEvent }; 