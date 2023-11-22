import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { DashboardEndpoints } from "../constants/dashboard.endpoints";
import { UserDetailResponse } from "../types/dashboard.types";

const useGetUser = (userId: string) => {
  const {
    data: user,
    isRefetching: isGetUserLoading,
    refetch: refetchUser,
  } = useQuery<UserDetailResponse>({
    queryKey: ["useGetUser"],
    queryFn: () => {
      return api.get(DashboardEndpoints.USER(userId));
    },
    enabled: !!userId,
  });

  return {
    user,
    isGetUserLoading,
    refetchUser,
  };
};

export default useGetUser;
