export const ProjectsEndpoints = {
  PROJECT_DETAIL: (userId: string, projectId: string) =>
    `users/${userId}/projects/${projectId}`,
  PROJECT_MEMBERS: (projectId: string) => `projects/${projectId}/members`,
  PROJECT_MEMBER_DETAIL: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}`,
  SUB_PROJECTS: (projectId: string) => `projects/${projectId}/sub-projects`,
};
