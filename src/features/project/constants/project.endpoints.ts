export const ProjectsEndpoints = {
  PROJECT: (projectId: string) => `projects/${projectId}`,
  PROJECT_MEMBER_DETAIL: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}`,
};
