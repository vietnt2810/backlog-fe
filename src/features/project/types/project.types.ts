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

export type SubProject = {
  id: number;
  subProjectName: string;
  subTitle: string;
};

export type UpdateUserInProjectRequestBody = {
  memberName: string;
};

export type CreateSubProjectRequestBody = {
  subProjectName: string;
  subTitle: string;
};
