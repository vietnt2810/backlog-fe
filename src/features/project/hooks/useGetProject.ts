import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { ProjectDetailResponse } from "../types/project.types";

const useGetProject = (userId: string, projectId: string) => {
  const {
    data: project,
    isLoading: isGetProjectLoading,
    refetch: refetchProject,
  } = useQuery<ProjectDetailResponse>({
    queryKey: ["useGetProject", projectId],
    queryFn: () => {
      return api.get(ProjectsEndpoints.PROJECT_DETAIL(userId, projectId));
    },
  });

  return {
    project,
    isGetProjectLoading,
    refetchProject,
  };
};

export default useGetProject;
