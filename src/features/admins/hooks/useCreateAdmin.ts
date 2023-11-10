import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";

import api from "@/api/api";
import {
  CreateAdminRequestBody,
  CreateAdminResponse,
} from "@/features/admins/types/admins.types";
import { DataError } from "@/types/api.types";

import { AdminsEndpoints } from "../admins";

const useCreateAdmin = () => {
  const {
    mutateAsync: createAdmin,
    isLoading: isCreateAdminLoading,
    error,
  } = useMutation<CreateAdminResponse, DataError, CreateAdminRequestBody>({
    mutationFn: params => {
      return api.post(
        AdminsEndpoints.ADMINS(),
        omit(params, ["confirmPassword", "filePath"])
      );
    },
  });

  return {
    createAdmin,
    isCreateAdminLoading,
    error,
  };
};

export default useCreateAdmin;
