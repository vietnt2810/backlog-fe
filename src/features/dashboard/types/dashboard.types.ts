export type UserDetailResponse = {
  email: string;
  username: string;
  avatarUrl: string;
};

export type Project = {
  id: number;
  projectName: string;
  createdAt: string;
};

export type ProjectsResponse = Project[];

export type UpdateUserRequestBody = {
  email: string;
  username: string;
  avatarUrl: string | null;
};
