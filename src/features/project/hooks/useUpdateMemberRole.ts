import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { ProjectsEndpoints } from "../constants/project.endpoints";

const useUpdateMemberRole = (projectId: string) => {
  const {
    mutateAsync: updateMemberRole,
    isLoading: isUpdateMemberRoleLoading,
  } = useMutation({
    mutationFn: (updateMemberRoleRequestBody: {
      memberId: number;
      role: number;
    }) => {
      return api.put(
        ProjectsEndpoints.UPDATE_MEMBER_ROLE(
          projectId,
          String(updateMemberRoleRequestBody.memberId)
        ),
        { role: updateMemberRoleRequestBody.role }
      );
    },
  });

  return {
    updateMemberRole,
    isUpdateMemberRoleLoading,
  };
};

export default useUpdateMemberRole;
