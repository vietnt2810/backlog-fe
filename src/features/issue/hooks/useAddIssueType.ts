import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issue.endpoints";
import { AddIssueTypeRequestBody } from "../types/issues.types";

const useAddIssueType = () => {
  const { mutateAsync: addIssueType, isLoading: isAddIssueTypeLoading } =
    useMutation({
      mutationFn: (addIssueTypeRequestBody: AddIssueTypeRequestBody) => {
        return api.post(
          IssuesEndpoints.MASTER_ISSUE_TYPES(),
          addIssueTypeRequestBody
        );
      },
    });

  return {
    addIssueType,
    isAddIssueTypeLoading,
  };
};

export default useAddIssueType;
