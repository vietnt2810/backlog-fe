import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";
import { ProjectsEndpoints } from "@/features/project/constants/project.endpoints";

import { GetIssuesParams, IssuesResponse } from "../types/issues.types";

const useGetIssues = (subProjectId: string, params?: GetIssuesParams) => {
  const {
    data: issues,
    isLoading: isIssuesLoading,
    refetch: refetchIssues,
  } = useQuery<IssuesResponse>({
    queryKey: ["useGetIssues", subProjectId],
    queryFn: () => {
      return api.get(ProjectsEndpoints.SUB_PROJECTS_ISSUES(subProjectId), {
        params,
      });
    },
  });

  return {
    issues,
    isIssuesLoading,
    refetchIssues,
  };
};

export default useGetIssues;
