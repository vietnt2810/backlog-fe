import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issue.endpoints";
import { IssueHistoryResponse } from "../types/issues.types";

const useGetIssueHistory = (issueId: string) => {
  const { data: issueHistory, refetch: refetchIssueHistory } =
    useQuery<IssueHistoryResponse>({
      queryKey: ["useGetIssueHistory", issueId],
      queryFn: () => {
        return api.get(IssuesEndpoints.ISSUE_HISTORY(issueId));
      },
    });

  return {
    issueHistory,
    refetchIssueHistory,
  };
};

export default useGetIssueHistory;
