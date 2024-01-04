import { PaginationParams } from "@/types/pagination.types";

export type Project = {
  id: number;
  projectName: string;
  createdAt: string;
};

export type ProjectDetailResponse = {
  username: string;
  role: boolean;
  project: Project;
};

export type ProjectMembersResponse = {
  data: {
    userId: number;
    username: string;
    role: number;
    joinedDate: string;
    user: {
      email: string;
      avatarUrl: string;
    };
  }[];
  meta: {
    page: number;
    totalRecord: number;
    totalMember: number;
  };
};

export type ProjectMemberDetailResponse = {
  username: string;
  role: number;
};

export type SubProjectsResponse = SubProject[];

export type SubProjectDetailResponse = Omit<SubProject, "id">;

export type SubProject = {
  id: number;
  subProjectName: string;
  subTitle: string;
};

export type UserIssuesParams = {
  isAssigned: number;
};

export type UserIssuesResponse = {
  id: number;
  subProjectId: number;
  issueKey: string;
  subject: string;
  priority: number;
  status: number;
  dueDate: string | null;
}[];

export type UpdateUserInProjectRequestBody = {
  memberName: string;
};

export type CreateSubProjectRequestBody = {
  subProjectName: string;
  subTitle: string;
};

export type RecentUpdatesResponse = RecentUpdateItemType[];

export type RecentUpdateItemType = {
  id: number;
  issueId: number;
  subProjectId: number;
  oldStatus: number | null;
  newStatus: number;
  updateType: string;
  createdAt: string;
  issueKey: string;
  issueSubject: string;
  creatorAvatarUrl: string;
  creatorUsername: string;
  assigneeUsername: string;
  assignerUsername: string | null;
};

export type IssueStatusCountResponse = {
  openIssuesCount: number;
  inProgressIssuesCount: number;
  resolvedIssuesCount: number;
  pendingIssuesCount: number;
  closedIssuesCount: number;
  totalIssues: number;
};

export type GetProjectMembersParams = {
  keyword?: string | null;
  role?: string | null;
} & PaginationParams;

export type NotificationsResponse = {
  id: number;
  isRead: boolean;
  createdAt: string;
  issueUpdateId: number;
  subProjectId: number;
  issueId: number;
  issueKey: string;
  subject: string;
  status: number;
  updateType: string;
  creatorAvatarUrl: string;
  creatorUsername: string;
}[];

export type RecentlyViewedIssuesResponse = {
  issueId: number;
  issueKey: string;
  subject: string;
  subProjectId: number;
}[];
