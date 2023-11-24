import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { DashboardEndpoints } from "../constants/dashboard.endpoints";

const useDeleteProject = () => {
  const { mutateAsync: deleteProject, isLoading: isDeleteProjectLoading } =
    useMutation({
      mutationFn: (projectId: string) => {
        return api.delete(DashboardEndpoints.PROJECT(projectId));
      },
    });

  return {
    deleteProject,
    isDeleteProjectLoading,
  };
};

export default useDeleteProject;
