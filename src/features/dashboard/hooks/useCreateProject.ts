import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { DashboardEndpoints } from "../constants/dashboard.endpoints";
import { CreateProjectRequestBody } from "../types/dashboard.types";

const useCreateProject = () => {
  const { mutateAsync: createProject, isLoading: isCreateProjectLoading } =
    useMutation({
      mutationFn: (createProjectRequestBody: CreateProjectRequestBody) => {
        return api.post(
          DashboardEndpoints.PROJECTS(),
          createProjectRequestBody
        );
      },
    });

  return {
    createProject,
    isCreateProjectLoading,
  };
};

export default useCreateProject;
