import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";

import api from "@/api/api";
import {
  EditAdminResponse,
  EditAdminRequestBody,
} from "@/features/admins/types/admins.types";
import { DataError } from "@/types/api.types";

import { AdminsEndpoints } from "../admins";

const useEditAdmin = () => {
  const {
    mutateAsync: editAdmin,
    isLoading: isEditAdminLoading,
    error,
  } = useMutation<EditAdminResponse, DataError, EditAdminRequestBody>({
    mutationFn: params => {
      return api.patch(
        `${AdminsEndpoints.ADMINS()}/${params.id}`,
        omit(params, ["id", "email", "filePath"])
      );
    },
  });

  return {
    editAdmin,
    isEditAdminLoading,
    error,
  };
};

export default useEditAdmin;
