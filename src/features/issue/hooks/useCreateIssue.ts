import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { IssuesEndpoints } from "../constants/issue.endpoints";
import { CreateIssueRequestBody } from "../types/issues.types";

const useCreateIssue = (subProjectId: string) => {
  const { mutateAsync: createIssue, isLoading: isCreateIssueLoading } =
    useMutation({
      mutationFn: (createIssueRequestBody: CreateIssueRequestBody) => {
        return api.post(
          IssuesEndpoints.CREATE_ISSUE(subProjectId),
          createIssueRequestBody
        );
      },
    });

  return {
    createIssue,
    isCreateIssueLoading,
  };
};

export default useCreateIssue;
