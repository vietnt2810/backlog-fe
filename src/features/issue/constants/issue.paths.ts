export enum IssuePathsEnum {
  ISSUES = "/projects/:projectId/sub-projects/:subProjectId/issues",
  ISSUE_DETAIL = "/projects/:projectId/sub-projects/:subProjectId/issues/:issueId",
}

export const IssuePaths = {
  ISSUES: (projectId: string, subProjectId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/issues`,
  ISSUE_DETAIL: (projectId: string, subProjectId: string, issueId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/issues/${issueId}`,
};
