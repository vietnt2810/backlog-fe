import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { RecentlyViewedIssuesResponse } from "../types/project.types";

const useGetRecentlyViewedIssues = (projectId: string, userId: string) => {
  const { data: recentlyViewedIssues, refetch: refetchRecentlyViewedIssues } =
    useQuery<RecentlyViewedIssuesResponse>({
      queryKey: ["useGetRecentlyViewedIssues", projectId],
      queryFn: () => {
        return api.get(
          ProjectsEndpoints.RECENTLY_VIEWED_ISSUES(projectId, userId)
        );
      },
    });

  return { recentlyViewedIssues, refetchRecentlyViewedIssues };
};

export default useGetRecentlyViewedIssues;
