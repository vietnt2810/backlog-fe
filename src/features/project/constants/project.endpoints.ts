export const ProjectsEndpoints = {
  PROJECT_DETAIL: (userId: string, projectId: string) =>
    `users/${userId}/projects/${projectId}`,
  ADD_MEMBER: (projectId: string) => `projects/${projectId}/add-member`,
  PROJECT_MEMBERS: (projectId: string) => `projects/${projectId}/members`,
  PROJECT_MEMBER_DETAIL: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}`,
  UPDATE_MEMBER_ROLE: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}/change-role`,
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
  SUB_PROJECTS_ISSUES: (subProjectId: string) =>
    `sub-projects/${subProjectId}/issues`,
  NOTIFICATIONS: (projectId: string, userId: string) =>
    `projects/${projectId}/users/${userId}/notifications`,
  READ_NOTIFICATION: (notificationId: string) =>
    `projects/notifications/${notificationId}`,
  RECENTLY_VIEWED_ISSUES: (projectId: string, userId: string) =>
    `projects/${projectId}/users/${userId}/recently-viewed`,
  DELETE_MEMBER: (projectId: string, memberId: string) =>
    `projects/${projectId}/members/${memberId}/delete-member`,
};
