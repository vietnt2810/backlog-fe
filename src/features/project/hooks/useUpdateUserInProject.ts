import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { UpdateUserInProjectRequestBody } from "../types/project.types";

const useUpdateUserInProject = (projectId: string, memberId: string) => {
  const {
    mutateAsync: updateUserInProject,
    isLoading: isUpdateUserInProjectLoading,
  } = useMutation({
    mutationFn: (
      updateUserInProjectRequestBody: UpdateUserInProjectRequestBody
    ) => {
      return api.put(
        ProjectsEndpoints.PROJECT_MEMBER_DETAIL(projectId, memberId),
        updateUserInProjectRequestBody
      );
    },
  });

  return {
    updateUserInProject,
    isUpdateUserInProjectLoading,
  };
};

export default useUpdateUserInProject;
