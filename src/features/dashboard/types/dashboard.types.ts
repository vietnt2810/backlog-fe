import { Project } from "@/features/project/types/project.types";

export type UserDetailResponse = {
  email: string;
  username: string;
  avatarUrl: string;
};

export type ProjectsResponse = {
  role: boolean;
  project: Project;
}[];

export type UpdateUserRequestBody = {
  email: string;
  username: string;
  avatarUrl?: any;
};

export type CreateEditProjectRequestBody = {
  projectName: string;
  projectId?: number;
  userId?: string;
};
