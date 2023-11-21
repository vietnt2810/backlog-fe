export const DashboardEndpoints = {
  USERS: () => `users`,
  USER: (userId: string) => `users/${userId}`,
  PROJECTS: (userId: string) => `users/${userId}/projects`,
};
