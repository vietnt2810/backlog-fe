import { useContext } from "react";

import { useMutation } from "@tanstack/react-query";

import api from "@/api/api";
import { AuthenticationContext } from "@/components/organisms/AuthenticationProvider/AuthenticationProvider";
import { ACCESS_TOKEN_KEY, USER_ID } from "@/constants/constants";
import {
  LoginRequestBody,
  LoginResponse,
  RegisterRequestBody,
} from "@/features/auth/types/auth.types";
import { DataError } from "@/types/api.types";
import { handleClearLocalStorage } from "@/utils/utils";

import { AuthEndpoints } from "../constants/auth.endpoints";

/**
 * Hooks login, logout
 */
const useAuth = () => {
  const { setAccessToken, setRefreshToken } = useContext(AuthenticationContext);

  const { mutateAsync: postRegister, isLoading: isPostRegisterLoading } =
    useMutation({
      mutationFn: (params: RegisterRequestBody) => {
        return api.post(AuthEndpoints.REGISTER(), params);
      },
    });

  const { mutateAsync: postLogin, isLoading: isPostLoginLoading } = useMutation<
    LoginResponse,
    DataError,
    LoginRequestBody
  >({
    mutationFn: params => {
      return api.post(AuthEndpoints.LOGIN(), params);
    },
    onSuccess: loginResponse => {
      if (loginResponse?.data) {
        setAccessToken(loginResponse.data.accessToken);
        localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.data.accessToken);
        localStorage.setItem(USER_ID, String(loginResponse.data.userId));
      }
    },
  });

  const { mutateAsync: postLogout, isLoading: isPostLogoutLoading } =
    useMutation({
      mutationFn: () => {
        return api.post(AuthEndpoints.LOGOUT());
      },
      onSuccess: () => {
        setAccessToken("");
        setRefreshToken("");
        handleClearLocalStorage();
      },
    });

  return {
    postRegister,
    postLogin,
    postLogout,
    isPostRegisterLoading,
    isPostLoginLoading,
    isPostLogoutLoading,
  };
};

export default useAuth;
