import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { ProjectDetailResponse } from "../types/project.types";

const useGetProject = (projectId: string) => {
  const { data: project, isLoading: isGetProjectLoading } =
    useQuery<ProjectDetailResponse>({
      queryKey: ["useGetProject", projectId],
      queryFn: () => {
        return api.get(ProjectsEndpoints.PROJECT(projectId));
      },
    });

  return {
    project,
    isGetProjectLoading,
  };
};

export default useGetProject;
