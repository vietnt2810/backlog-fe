export enum IssuePathsEnum {
  ISSUE_DETAIL = "/projects/:projectId/sub-projects/:subProjectId/issues/:issueId",
}

export const IssuePaths = {
  ISSUE_DETAIL: (projectId: string, subProjectId: string, issueId: string) =>
    `/projects/${projectId}/sub-projects/${subProjectId}/issues/${issueId}`,
};
