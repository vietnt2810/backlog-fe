import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";
import { DataError } from "@/types/api.types";

import { EMAIL_STORAGE_KEY } from "../constants/auth.constants";
import { AuthEndpoints } from "../constants/auth.endpoints";
import { ConfirmForgotPasswordRequestBody } from "../types/auth.types";

const useConfirmForgotPassword = () => {
  const {
    mutateAsync: postConfirmForgotPassword,
    isLoading: isConfirmForgotPasswordLoading,
  } = useMutation<unknown, DataError, ConfirmForgotPasswordRequestBody>({
    mutationFn: data => {
      return api.post(AuthEndpoints.CONFIRM_FORGOT_PASSWORD(), data);
    },
    onSuccess: () => localStorage.removeItem(EMAIL_STORAGE_KEY),
  });

  return { postConfirmForgotPassword, isConfirmForgotPasswordLoading };
};

export default useConfirmForgotPassword;
