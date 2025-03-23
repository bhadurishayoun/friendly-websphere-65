
interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
}

// This maps your project titles to their GitHub repository names
const projectToRepoMap: Record<string, string> = {
  "Student Gap Analysis": "student-gap-analysis",
  "Face Recognition of Partially Occluded Objects": "face-recognition",
  "Weather Forecasting": "weather-forecast",
  "Diversity Inclusion Dashboard": "", // No GitHub repo for this project
  "Virtual Assistant Chatbot": "virtual-assistant"
};

export const fetchGitHubStats = async (projectTitle: string): Promise<{stars: number, language: string, repoUrl: string} | null> => {
  const repoName = projectToRepoMap[projectTitle];
  if (!repoName) return null;
  
  try {
    const response = await fetch(`https://api.github.com/repos/bhadurishayoun/${repoName}`);
    if (!response.ok) return null;
    
    const data: GitHubRepo = await response.json();
    return {
      stars: data.stargazers_count,
      language: data.language,
      repoUrl: data.html_url // Get the actual GitHub URL from the API
    };
  } catch (error) {
    console.error(`Error fetching GitHub data for ${projectTitle}:`, error);
    return null;
  }
};

export const getGitHubUrl = (projectTitle: string): string | null => {
  const repoName = projectToRepoMap[projectTitle];
  if (!repoName) return null;
  return `https://github.com/bhadurishayoun/${repoName}`;
};
