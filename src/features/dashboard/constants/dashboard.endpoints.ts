export const DashboardEndpoints = {
  USERS: () => `users`,
  USER: (userId: string) => `users/${userId}`,
  GET_PROJECTS: (userId: string) => `users/${userId}/projects`,
  PROJECTS: () => `projects`,
};
