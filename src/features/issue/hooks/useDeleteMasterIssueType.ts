import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issue.endpoints";

const useDeleteMasterIssueType = () => {
  const { mutateAsync: deleteIssueType, isLoading: isDeleteIssueTypeLoading } =
    useMutation({
      mutationFn: (issueTypeId: string) => {
        return api.delete(IssuesEndpoints.MASTER_ISSUE_TYPE(issueTypeId));
      },
    });

  return {
    deleteIssueType,
    isDeleteIssueTypeLoading,
  };
};

export default useDeleteMasterIssueType;
