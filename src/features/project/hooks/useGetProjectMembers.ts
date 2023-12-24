import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import {
  GetProjectMembersParams,
  ProjectMembersResponse,
} from "../types/project.types";

const useGetProjectMembers = (
  projectId: string,
  params?: GetProjectMembersParams
) => {
  const {
    data: projectMembers,
    isLoading: isGetProjectMembersLoading,
    refetch: refetchProjectsMembers,
  } = useQuery<ProjectMembersResponse>({
    queryKey: ["useGetProjectMembers", projectId],
    queryFn: () => {
      return api.get(ProjectsEndpoints.PROJECT_MEMBERS(projectId), {
        params,
      });
    },
  });

  return {
    projectMembers,
    isGetProjectMembersLoading,
    refetchProjectsMembers,
  };
};

export default useGetProjectMembers;
