export const ProjectsEndpoints = {
  PROJECT_DETAIL: (userId: string, projectId: string) =>
    `users/${userId}/projects/${projectId}`,
  PROJECT_MEMBER_DETAIL: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}`,
  SUB_PROJECTS: (projectId: string) => `projects/${projectId}/sub-projects`,
};
