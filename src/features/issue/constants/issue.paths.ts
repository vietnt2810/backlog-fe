export enum IssuePathsEnum {
  ISSUES = "/projects/:projectId/sub-projects/:subProjectId/issues",
  CREATE_ISSUE = "/projects/:projectId/sub-projects/:subProjectId/add-issue",
  ISSUE_DETAIL = "/projects/:projectId/sub-projects/:subProjectId/issues/:issueId",
  EDIT_ISSUE = "/projects/:projectId/sub-projects/:subProjectId/issues/:issueId/edit",
}

export const IssuePaths = {
  ISSUES: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/issues`,
  CREATE_ISSUE: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/add-issue`,
  ISSUE_DETAIL: (projectId: string, subProjectId: string, issueId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/issues/${issueId}`,
  EDIT_ISSUE: (projectId: string, subProjectId: string, issueId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/issues/${issueId}/edit`,
};
