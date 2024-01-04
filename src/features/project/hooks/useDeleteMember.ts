import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";

const useDeleteMember = (projectId: string) => {
  const { mutateAsync: deleteMember, isLoading: isDeleteMemberLoading } =
    useMutation({
      mutationFn: (memberId: string) => {
        return api.put(ProjectsEndpoints.DELETE_MEMBER(projectId, memberId));
      },
    });

  return {
    deleteMember,
    isDeleteMemberLoading,
  };
};

export default useDeleteMember;
