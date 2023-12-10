import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issues.endpoints";
import { MasterIssueTypesResponse } from "../types/issues.types";

const useGetMasterIssueTypes = (projectId: string) => {
  const {
    data: masterIssueTypes,
    isLoading: isGetMasterIssueTypesLoading,
    refetch: refetchMasterIssueTypes,
  } = useQuery<MasterIssueTypesResponse>({
    queryKey: ["useGetMasterIssueTypes", projectId],
    queryFn: () => {
      return api.get(IssuesEndpoints.GET_MASTER_ISSUE_TYPES(projectId));
    },
  });

  return {
    masterIssueTypes,
    isGetMasterIssueTypesLoading,
    refetchMasterIssueTypes,
  };
};

export default useGetMasterIssueTypes;
