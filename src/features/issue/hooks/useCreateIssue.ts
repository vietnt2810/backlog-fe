import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";
import { ProjectsEndpoints } from "@/features/project/constants/project.endpoints";

import { CreateIssueRequestBody } from "../types/issues.types";

const useCreateIssue = (subProjectId: string) => {
  const { mutateAsync: createIssue, isLoading: isCreateIssueLoading } =
    useMutation({
      mutationFn: (createIssueRequestBody: CreateIssueRequestBody) => {
        return api.post(
          ProjectsEndpoints.SUB_PROJECTS_ISSUES(subProjectId),
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
