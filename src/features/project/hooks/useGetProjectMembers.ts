import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { ProjectMembersResponse } from "../types/project.types";

const useGetProjectMembers = (projectId: string) => {
  const { data: projectMembers, isLoading: isGetProjectMembersLoading } =
    useQuery<ProjectMembersResponse>({
      queryKey: ["useGetProjectMembers", projectId],
      queryFn: () => {
        return api.get(ProjectsEndpoints.PROJECT_MEMBERS(projectId));
      },
    });

  return {
    projectMembers,
    isGetProjectMembersLoading,
  };
};

export default useGetProjectMembers;
