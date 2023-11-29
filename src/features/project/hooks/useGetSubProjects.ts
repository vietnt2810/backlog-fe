import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { SubProjectsResponse } from "../types/project.types";

const useGetSubProjects = (projectId: string) => {
  const {
    data: subProjects,
    isLoading: isGetSubProjectsLoading,
    refetch: refetchSubProjects,
  } = useQuery<SubProjectsResponse>({
    queryKey: ["useGetSubProjects", projectId],
    queryFn: () => {
      return api.get(ProjectsEndpoints.SUB_PROJECTS(projectId));
    },
  });

  return {
    subProjects,
    isGetSubProjectsLoading,
    refetchSubProjects,
  };
};

export default useGetSubProjects;
