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

export type UpdateIssueRequestBody = {
  comment?: string;
  status: number;
  assigneeId: number;
  startDate?: string;
  dueDate?: string;
  estimatedHour?: number;
  actualHour?: number;
  updaterId: number;
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
  assigneeUserId: number;
  assigneeAvatarUrl: string | null;
  assigneeUsername: string;
  creatorAvatarUrl: string | null;
  creatorUsername: string;
  createdAt: string;
};

export type IssueHistoryResponse = {
  content: string | null;
  oldStatus: number | null;
  newStatus: number;
  oldStartDate: string;
  newStartDate: string;
  oldDueDate: string;
  newDueDate: string;
  oldEstimatedHour: number;
  newEstimatedHour: number;
  oldActualHour: number;
  newActualHour: number;
  updateType: string;
  createdAt: string;
  creatorAvatarUrl: string | null;
  creatorUsername: string;
  assignerUsername: string;
  assigneeUsername: string;
}[];
