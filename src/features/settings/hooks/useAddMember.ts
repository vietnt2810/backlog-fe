import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";
import { ProjectsEndpoints } from "@/features/project/constants/project.endpoints";

import { AddMemberRequestBody } from "../types/settings.types";

const useAddMember = (projectId: string) => {
  const { mutateAsync: addMember, isLoading: isAddMemberLoading } = useMutation(
    {
      mutationFn: (addMemberRequestBody: AddMemberRequestBody) => {
        return api.post(
          ProjectsEndpoints.ADD_MEMBER(projectId),
          addMemberRequestBody
        );
      },
    }
  );

  return {
    addMember,
    isAddMemberLoading,
  };
};

export default useAddMember;
