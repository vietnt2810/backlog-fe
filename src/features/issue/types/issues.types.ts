export type MasterIssueType = {
  id: number;
  issueType: string;
};

export type MasterIssueTypesResponse = MasterIssueType[];

export type CreateIssueRequestBody = {
  type: number;
  subject: string;
  description: string;
  status: number;
  assigneeId: number;
  priority: number;
  startDate?: string;
  dueDate?: string;
  estimatedHour?: number;
  actualHour?: number;
  createdByUserId: number;
};
