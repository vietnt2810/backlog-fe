import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";

const useDeleteSubProject = () => {
  const {
    mutateAsync: deleteSubProject,
    isLoading: isDeleteSubProjectLoading,
  } = useMutation({
    mutationFn: (subProjectId: string) => {
      return api.delete(ProjectsEndpoints.SUB_PROJECT_DETAIL(subProjectId));
    },
  });

  return {
    deleteSubProject,
    isDeleteSubProjectLoading,
  };
};

export default useDeleteSubProject;
