import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { CreateSubProjectRequestBody } from "../types/project.types";

const useCreateSubProject = (projectId: string) => {
  const {
    mutateAsync: createSubProject,
    isLoading: isCreateSubProjectLoading,
  } = useMutation({
    mutationFn: (createSubProjectRequestBody: CreateSubProjectRequestBody) => {
      return api.post(
        ProjectsEndpoints.SUB_PROJECTS(projectId),
        createSubProjectRequestBody
      );
    },
  });

  return {
    createSubProject,
    isCreateSubProjectLoading,
  };
};

export default useCreateSubProject;
