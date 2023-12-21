import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { SubProjectDetailResponse } from "../types/project.types";

const useGetSubProjectDetail = (subProjectId: string) => {
  const { data: subProjectDetail } = useQuery<SubProjectDetailResponse>({
    queryKey: ["useGetSubProjectDetail", subProjectId],
    queryFn: () => {
      return api.get(ProjectsEndpoints.SUB_PROJECT_DETAIL(subProjectId));
    },
    enabled: !!subProjectId,
  });

  return { subProjectDetail };
};

export default useGetSubProjectDetail;
