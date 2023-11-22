import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { DashboardEndpoints } from "../constants/dashboard.endpoints";
import { ProjectsResponse } from "../types/dashboard.types";

const useGetProjects = (userId: string) => {
  const {
    data: projects,
    isLoading: isGetProjectsLoading,
    refetch: refetchProjects,
  } = useQuery<ProjectsResponse>({
    queryKey: ["useGetProjects"],
    queryFn: () => {
      return api.get(DashboardEndpoints.GET_PROJECTS(userId));
    },
    enabled: !!userId,
  });

  return {
    projects,
    isGetProjectsLoading,
    refetchProjects,
  };
};

export default useGetProjects;
