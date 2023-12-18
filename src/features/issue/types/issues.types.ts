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

export type IssueDetailResponse = {
  subject: string;
  description: string;
  status: number;
  issueType: string;
  priority: number;
  startDate: string | null;
  dueDate: string | null;
  estimatedHour: null;
  actualHour: null;
  issueKey: string;
  assigneeAvatarUrl: string | null;
  assigneeUsername: string;
  creatorAvatarUrl: string | null;
  creatorUsername: string;
  createdAt: string;
};
