import { DataResponse } from "@/types/api.types";

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type RegisterRequestBody = {
  email: string;
  password: string;
  username: string;
};

export type ForgotPasswordRequestBody = {
  email: string;
};

export interface LoginResponse extends DataResponse {
  data: {
    accessToken: string;
    username: string;
    userId: number;
  };
}

export type VerifyCodeRequestBody = {
  email: string;
  code: string;
};

export type ConfirmForgotPasswordRequestBody = {
  code: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
};
