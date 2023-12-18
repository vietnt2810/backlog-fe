import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { UserIssuesParams, UserIssuesResponse } from "../types/project.types";

const useGetUserIssues = (
  userId: string,
  projectId: string,
  params?: UserIssuesParams
) => {
  const {
    data: userIssues,
    isLoading: isGetUserIssuesLoading,
    refetch: refetchUserIssues,
  } = useQuery<UserIssuesResponse>({
    queryKey: ["useGetUserIssues", projectId],
    queryFn: () => {
      return api.get(ProjectsEndpoints.USER_ISSUES(userId, projectId), {
        params,
      });
    },
  });

  return {
    userIssues,
    isGetUserIssuesLoading,
    refetchUserIssues,
  };
};

export default useGetUserIssues;
