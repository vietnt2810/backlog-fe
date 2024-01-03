import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../../issue/constants/issue.endpoints";
import { AddUpdateIssueTypeRequestBody } from "../../issue/types/issues.types";

const useAddIssueType = () => {
  const { mutateAsync: addIssueType, isLoading: isAddIssueTypeLoading } =
    useMutation({
      mutationFn: (addIssueTypeRequestBody: AddUpdateIssueTypeRequestBody) => {
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
