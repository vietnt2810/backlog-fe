import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issue.endpoints";
import { IssueDetailResponse } from "../types/issues.types";

const useGetIssueDetail = (issueId: string) => {
  const { data: issueDetail, isLoading: isGetIssueDetailLoading } =
    useQuery<IssueDetailResponse>({
      queryKey: ["useGetIssueDetail", issueId],
      queryFn: () => {
        return api.get(IssuesEndpoints.ISSUE_DETAIL(issueId));
      },
    });

  return {
    issueDetail,
    isGetIssueDetailLoading,
  };
};

export default useGetIssueDetail;
