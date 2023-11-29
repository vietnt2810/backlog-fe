export enum ProjectPathsEnum {
  PROJECT_HOMEPAGE = "/:projectId",
}

export const ProjectPaths = {
  PROJECT_HOMEPAGE: (projectId: string) => `/${projectId}`,
};
