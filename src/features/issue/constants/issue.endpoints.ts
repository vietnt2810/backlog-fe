export const IssuesEndpoints = {
  MASTER_ISSUE_TYPES: () => `master-issues`,
  GET_MASTER_ISSUE_TYPES: (projectId: string) => `master-issues/${projectId}`,
  CREATE_ISSUE: (subProjectId: string) => `issues/${subProjectId}`,
  ISSUE_DETAIL: (issueId: string) => `issues/${issueId}`,
  ISSUE_HISTORY: (issueId: string) => `issues/${issueId}/history`,
};
