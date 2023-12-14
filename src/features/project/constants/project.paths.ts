export enum ProjectPathsEnum {
  PROJECT_HOMEPAGE = "/:projectId",
  SUB_PROJECT_HOMEPAGE = "/:projectId/:subProjectId",
}

export const ProjectPaths = {
  PROJECT_HOMEPAGE: (projectId: string) => `/${projectId}`,
  SUB_PROJECT_HOMEPAGE: (projectId: string, subProjectId: string) =>
    `/${projectId}/${subProjectId}`,
};
