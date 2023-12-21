export type PaginationResponse = {
  page?: number;
  totalRecord?: number;
};

export type PaginationParams = {
  page?: string | null;
  perPage?: string | null;
};
