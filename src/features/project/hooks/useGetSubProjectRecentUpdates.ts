import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { RecentUpdatesResponse } from "../types/project.types";

const useGetSubProjectRecentUpdates = (subProjectId: string) => {
  const { data: subProjectRecentUpdates } = useQuery<RecentUpdatesResponse>({
    queryKey: ["useGetSubProjectRecentUpdates", subProjectId],
    queryFn: () => {
      return api.get(
        ProjectsEndpoints.SUB_PROJECT_RECENT_UPDATES(subProjectId)
      );
    },
  });

  return { subProjectRecentUpdates };
};

export default useGetSubProjectRecentUpdates;
