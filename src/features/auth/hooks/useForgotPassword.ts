import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";
import { DataError } from "@/types/api.types";

import { EMAIL_STORAGE_KEY } from "../constants/auth.constants";
import { AuthEndpoints } from "../constants/auth.endpoints";
import { ForgotPasswordRequestBody } from "../types/auth.types";

const useForgotPassword = () => {
  const {
    mutateAsync: postForgotPassword,
    isLoading: isForgotPasswordLoading,
  } = useMutation<unknown, DataError, ForgotPasswordRequestBody>({
    mutationFn: data => {
      return api.post(AuthEndpoints.FORGOT_PASSWORD(), data);
    },
    onSuccess: (_, variables) =>
      localStorage.setItem(EMAIL_STORAGE_KEY, variables.email),
  });

  return { postForgotPassword, isForgotPasswordLoading };
};

export default useForgotPassword;
