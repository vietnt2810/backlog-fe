export enum ProjectPathsEnum {
  PROJECT_HOMEPAGE = "/projects/:projectId",
  SUB_PROJECT_HOMEPAGE = "/projects/:projectId/sub-projects/:subProjectId",
}

export const ProjectPaths = {
  PROJECT_HOMEPAGE: (projectId: string) => `/projects/${projectId}`,
  SUB_PROJECT_HOMEPAGE: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}`,
};
