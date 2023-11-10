import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";
import { DataError } from "@/types/api.types";

import { AdminsEndpoints } from "../admins";

const useDeleteAdmin = () => {
  const {
    mutateAsync: deleteAdmin,
    isLoading: isDeleteLoading,
    error,
  } = useMutation<unknown, DataError, number>({
    mutationFn: adminID => {
      return api.delete(AdminsEndpoints.ADMINS_DELETE(adminID));
    },
  });

  return {
    deleteAdmin,
    isDeleteLoading,
    error,
  };
};

export default useDeleteAdmin;
