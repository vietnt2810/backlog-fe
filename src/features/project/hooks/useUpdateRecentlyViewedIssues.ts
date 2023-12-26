import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";

const useUpdateRecentlyViewedIssues = (projectId: string, userId: string) => {
  const { mutateAsync: updateRecentlyViewedIssues } = useMutation({
    mutationFn: (issueId: string) => {
      return api.put(
        ProjectsEndpoints.RECENTLY_VIEWED_ISSUES(projectId, userId),
        { issueId }
      );
    },
  });

  return {
    updateRecentlyViewedIssues,
  };
};

export default useUpdateRecentlyViewedIssues;
