import { PaginationResponse } from "@/types/pagination.types";

export interface DataResponse {
  data: Record<string, unknown> | Record<string, unknown>[];
  meta: PaginationResponse;
}

export type SystemInformationResponse = {
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
};

export type DataError = {
  error: {
    code: string;
    propertyName?: string;
  };
  requestId: string;
  timestamp: string;
};

export interface RequestParams {
  page?: number;
  perPage?: number;
}
