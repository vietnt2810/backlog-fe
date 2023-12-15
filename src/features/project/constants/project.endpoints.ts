export const ProjectsEndpoints = {
  PROJECT_DETAIL: (userId: string, projectId: string) =>
    `users/${userId}/projects/${projectId}`,
  PROJECT_MEMBERS: (projectId: string) => `projects/${projectId}/members`,
  PROJECT_MEMBER_DETAIL: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}`,
  SUB_PROJECTS: (projectId: string) => `projects/${projectId}/sub-projects`,
  SUB_PROJECT_DETAIL: (subProjectId: string) => `sub-projects/${subProjectId}`,
  USER_ISSUES: (projectId: string, userId: string) =>
    `projects/${projectId}/users/${userId}/issues`,
  PROJECT_RECENT_UPDATES: (projectId: string) =>
    `projects/${projectId}/recent-updates`,
  SUB_PROJECT_RECENT_UPDATES: (subProjectId: string) =>
    `sub-projects/${subProjectId}/recent-updates`,
  SUB_PROJECT_ISSUE_STATUS_COUNT: (subProjectId: string) =>
    `sub-projects/${subProjectId}/issue-status`,
};
