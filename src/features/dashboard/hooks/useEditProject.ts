import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { DashboardEndpoints } from "../constants/dashboard.endpoints";
import { CreateEditProjectRequestBody } from "../types/dashboard.types";

const useEditProject = (projectId: string) => {
  const { mutateAsync: editProject, isLoading: isEditProjectLoading } =
    useMutation({
      mutationFn: (editProjectRequestBody: CreateEditProjectRequestBody) => {
        return api.put(
          DashboardEndpoints.PROJECT(projectId),
          editProjectRequestBody
        );
      },
    });

  return {
    editProject,
    isEditProjectLoading,
  };
};

export default useEditProject;
