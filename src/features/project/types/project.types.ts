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
  userId: number;
  username: string;
  role: boolean;
  user: {
    email: string;
    avatarUrl: string;
  };
}[];

export type ProjectMemberDetailResponse = {
  username: string;
  role: boolean;
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
