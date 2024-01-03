import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../../issue/constants/issue.endpoints";
import { MasterIssueTypeDetailResponse } from "../../issue/types/issues.types";

const useGetMasterIssueType = (issueTypeId: string) => {
  const { data: masterIssueType, isLoading: isGetMasterIssueTypeLoading } =
    useQuery<MasterIssueTypeDetailResponse>({
      queryKey: ["useGetMasterIssueType", issueTypeId],
      queryFn: () => {
        return api.get(IssuesEndpoints.MASTER_ISSUE_TYPE(issueTypeId));
      },
    });

  return {
    masterIssueType,
    isGetMasterIssueTypeLoading,
  };
};

export default useGetMasterIssueType;
