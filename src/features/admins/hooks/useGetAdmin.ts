import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";
import { AdminDetailResponse } from "@/features/admins/types/admins.types";
import { DataError } from "@/types/api.types";

import { AdminsEndpoints } from "../admins";

const useGetAdmin = (id?: string | null) => {
  const {
    data: adminResponse,
    isLoading: isGetAdminLoading,
    error,
  } = useQuery<AdminDetailResponse, DataError>({
    queryKey: ["useGetAdmin", id],
    queryFn: () => {
      return api.get(`${AdminsEndpoints.ADMINS()}/${id}`);
    },
    enabled: !!id,
  });

  return {
    admin: adminResponse?.data,
    isGetAdminLoading,
    error,
  };
};

export default useGetAdmin;
