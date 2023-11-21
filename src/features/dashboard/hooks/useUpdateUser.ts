import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";

import { DashboardEndpoints } from "../constants/dashboard.endpoints";
import { UpdateUserRequestBody } from "../types/dashboard.types";

const useUpdateUser = () => {
  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useMutation({
      mutationFn: (updateUserRequestBody: UpdateUserRequestBody) => {
        return api.put(DashboardEndpoints.USERS(), updateUserRequestBody);
      },
    });

  return {
    updateUser,
    isUpdateUserLoading,
  };
};

export default useUpdateUser;
