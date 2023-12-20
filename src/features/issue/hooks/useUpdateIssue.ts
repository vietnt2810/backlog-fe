import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issue.endpoints";
import { UpdateIssueRequestBody } from "../types/issues.types";

const useUpdateIssue = (issueId: string) => {
  const { mutateAsync: updateIssue, isLoading: isUpdateIssueLoading } =
    useMutation({
      mutationFn: (updateIssueRequestBody: UpdateIssueRequestBody) => {
        return api.put(
          IssuesEndpoints.ISSUE_DETAIL(issueId),
          updateIssueRequestBody
        );
      },
    });

  return {
    updateIssue,
    isUpdateIssueLoading,
  };
};

export default useUpdateIssue;
