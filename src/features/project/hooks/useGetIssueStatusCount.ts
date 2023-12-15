import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { IssueStatusCountResponse } from "../types/project.types";

const useGetIssueStatusCount = (subProjectId: string) => {
  const { data: issueStatusCount } = useQuery<IssueStatusCountResponse>({
    queryKey: ["useGetIssueStatusCount", subProjectId],
    queryFn: () => {
      return api.get(
        ProjectsEndpoints.SUB_PROJECT_ISSUE_STATUS_COUNT(subProjectId)
      );
    },
  });

  return { issueStatusCount };
};

export default useGetIssueStatusCount;
