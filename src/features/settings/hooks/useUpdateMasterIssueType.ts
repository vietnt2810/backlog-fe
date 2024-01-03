import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../../issue/constants/issue.endpoints";
import { AddUpdateIssueTypeRequestBody } from "../../issue/types/issues.types";

const useUpdateMasterIssueType = () => {
  const { mutateAsync: updateIssueType, isLoading: isUpdateIssueTypeLoading } =
    useMutation({
      mutationFn: (
        updateIssueTypeRequestBody: AddUpdateIssueTypeRequestBody
      ) => {
        return api.put(
          IssuesEndpoints.MASTER_ISSUE_TYPE(
            String(updateIssueTypeRequestBody.issueTypeId)
          ),
          updateIssueTypeRequestBody
        );
      },
    });

  return {
    updateIssueType,
    isUpdateIssueTypeLoading,
  };
};

export default useUpdateMasterIssueType;
