export const DashboardEndpoints = {
  USER: (userId: string) => `users/${userId}`,
  PROJECTS: (userId: string) => `users/${userId}/projects`,
};
