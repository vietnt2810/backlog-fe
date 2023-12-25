import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { RecentUpdatesResponse } from "../types/project.types";

const useGetProjectRecentUpdates = (projectId: string) => {
  const { data: projectRecentUpdates, refetch: refetchProjectRecentUpdates } =
    useQuery<RecentUpdatesResponse>({
      queryKey: ["useGetProjectRecentUpdates", projectId],
      queryFn: () => {
        return api.get(ProjectsEndpoints.PROJECT_RECENT_UPDATES(projectId));
      },
    });

  return { projectRecentUpdates, refetchProjectRecentUpdates };
};

export default useGetProjectRecentUpdates;
