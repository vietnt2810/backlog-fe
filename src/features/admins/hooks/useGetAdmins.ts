import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";
import {
  AdminsParams,
  AdminsResponse,
} from "@/features/admins/types/admins.types";
import { DataError } from "@/types/api.types";

import { AdminsEndpoints } from "../constants/admins.endpoints";

const useGetAdmins = (params: AdminsParams) => {
  const {
    data: admins,
    isFetching: isGetAdminsFetching,
    refetch: refetchGetAdmins,
    error,
  } = useQuery<AdminsParams, DataError, AdminsResponse>({
    queryKey: ["useGetAdmins", params],
    queryFn: () => {
      return api.get(AdminsEndpoints.ADMINS(), { params });
    },
  });

  return {
    admins,
    isGetAdminsFetching,
    refetchGetAdmins,
    error,
  };
};

export default useGetAdmins;
