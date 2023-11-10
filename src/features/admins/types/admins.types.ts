import {
  DataResponse,
  RequestParams,
  SystemInformationResponse,
} from "@/types/api.types";

export type CreateAdminRequestBody = {
  email?: string;
  nameFamily?: string;
  nameFirst?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string | Avatar[];
  avatarInfo?: {
    fileName?: string;
  };
  filePath?: string;
};

export type AdminResponse = {
  id: number;
  nameFamily?: string;
  nameFirst?: string | JSX.Element;
  email?: string | JSX.Element;
  createdAt?: string;
  updatedAt?: string;
  isLoging?: number;
  avatarInfo?: AvatarInfo;
  filePath?: string;
};
export interface AdminsResponse extends DataResponse {
  data: AdminResponse[];
}

export type AdminsParams = RequestParams;

export type EditAdminRequestBody = {
  id?: number | null | string;
  nameFamily?: string;
  nameFirst?: string;
  password?: string;
  filePath?: string;
  avatar?: string | Avatar[];
};

export type AdminDetail = Omit<
  AdminResponse,
  "createdAt" | "updatedAt" | "isLoging"
>;

export interface AdminDetailResponse extends DataResponse {
  data: AdminDetail & SystemInformationResponse;
}

export interface CreateAdminResponse extends DataResponse {
  data: {
    id: number;
    avatarInfo?: AvatarInfo;
  };
}

export interface EditAdminResponse extends DataResponse {
  data: {
    id: number;
    avatarInfo?: AvatarInfo;
  };
}

export type AvatarInfo = {
  method?: string;
  url?: string;
  filePath?: string;
  fileName?: string;
  imagepath?: string;
};

export type Avatar = {
  imagepath?: string;
  isDelete?: boolean;
};
