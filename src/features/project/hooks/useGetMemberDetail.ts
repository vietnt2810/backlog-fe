import { useQuery } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";
import { ProjectMemberDetailResponse } from "../types/project.types";

const useGetMemberDetail = (projectId: string, memberId: string) => {
  const { data: memberDetail, isLoading: isGetMemberDetailLoading } =
    useQuery<ProjectMemberDetailResponse>({
      queryKey: ["useGetMemberDetail", projectId],
      queryFn: () => {
        return api.get(
          ProjectsEndpoints.PROJECT_MEMBER_DETAIL(projectId, memberId)
        );
      },
    });

  return {
    memberDetail,
    isGetMemberDetailLoading,
  };
};

export default useGetMemberDetail;
