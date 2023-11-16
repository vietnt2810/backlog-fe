export type UserDetailResponse = {
  email: string;
  username: string;
};

export type Project = {
  id: number;
  projectName: string;
  createdAt: string;
};

export type ProjectsResponse = Project[];
