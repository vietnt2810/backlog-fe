export type ProjectDetailResponse = {
  id: number;
  projectName: string;
  createdAt: string;
};

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
