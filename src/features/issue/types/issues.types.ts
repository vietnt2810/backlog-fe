import { PaginationParams } from "@/types/pagination.types";

export type MasterIssueType = {
  id: number;
  issueType: string;
  isCommon: boolean;
  color: string;
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
  issueTypeColor: string;
  issueTypeId: number;
  priority: number;
  startDate: string | null;
  dueDate: string | null;
  estimatedHour: null;
  actualHour: null;
  issueKey: string;
  assigneeUserId: number;
  assigneeAvatarUrl: string | null;
  assigneeUsername: string;
  isAssigneeRemoved: boolean;
  creatorAvatarUrl: string | null;
  creatorUsername: string;
  isCreatorRemoved: boolean;
  createdAt: string;
  attachedFile:
    | {
        fileUrl: string;
        fileName: string;
      }[]
    | null;
};

export type IssueHistoryResponse = {
  id: number;
  content: string | null;
  attachedFile:
    | {
        fileUrl: string;
        fileName: string;
      }[]
    | null;
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

export type GetIssuesParams = {
  keyword?: string | null;
  isOverdue?: string | null;
  status?: string | null;
  type?: string | null;
  assigneeId?: string | null;
} & PaginationParams;

export type IssuesResponse = {
  data: {
    id: number;
    subject: string;
    status: number;
    issueType: string;
    issueTypeColor: string;
    priority: number;
    startDate: string | null;
    dueDate: string | null;
    issueKey: string;
    createdAt: string;
    lastUpdatedAt: string;
    estimatedHour: string | null;
    actualHour: string | null;
    creatorAvatarUrl: string | null;
    creatorUsername: string;
    assigneeAvatarUrl: string | null;
    assigneeUsername: string;
  }[];
  meta: {
    page: number;
    totalRecord: number;
  };
};

export type AddUpdateIssueTypeRequestBody = {
  issueType: string;
  color: string;
  projectId: string;
  issueTypeId?: number;
};

export type MasterIssueTypeDetailResponse = {
  issueType: string;
  color: string;
};
