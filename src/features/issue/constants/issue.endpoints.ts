export const IssuesEndpoints = {
  MASTER_ISSUE_TYPES: () => `master-issues`,
  GET_MASTER_ISSUE_TYPES: (projectId: string) => `master-issues/${projectId}`,
  MASTER_ISSUE_TYPE: (issueTypeId: string) => `master-issues/${issueTypeId}`,
  ISSUE_DETAIL: (issueId?: string) => `issues/${issueId}`,
  ISSUE_HISTORY: (issueId: string) => `issues/${issueId}/history`,
};
