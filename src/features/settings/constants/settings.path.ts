export enum SettingPathsEnum {
  SETTING = "/projects/:projectId/sub-projects/:subProjectId/setting",
  MEMBERS = "/projects/:projectId/sub-projects/:subProjectId/setting/members",
  ISSUE_TYPES = "/projects/:projectId/sub-projects/:subProjectId/setting/issue-types",
}

export const SettingPaths = {
  SETTING: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/setting`,
  MEMBERS: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/setting/members`,
  ISSUE_TYPES: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/setting/issue-types`,
};
