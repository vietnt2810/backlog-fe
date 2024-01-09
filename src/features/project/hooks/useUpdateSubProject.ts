import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { CreateSubProjectRequestBody } from "../types/project.types";

const useUpdateSubProject = (subProjectId: string) => {
  const {
    mutateAsync: updateSubProject,
    isLoading: isUpdateSubProjectLoading,
  } = useMutation({
    mutationFn: (updateSubProjectRequestBody: CreateSubProjectRequestBody) => {
      return api.put(
        ProjectsEndpoints.SUB_PROJECT_DETAIL(subProjectId),
        updateSubProjectRequestBody
      );
    },
  });

  return {
    updateSubProject,
    isUpdateSubProjectLoading,
  };
};

export default useUpdateSubProject;
