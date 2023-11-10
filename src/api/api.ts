import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { t } from "i18next";

import { openNotification } from "@/components/organisms/Notification/Notification";
import { ApiStatusCodes } from "@/constants/api.constants";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/constants";
import { AdminsPathsEnum } from "@/features/admins/constants/admins.paths";
import { AuthEndpoints } from "@/features/auth/constants/auth.endpoints";
import { handleClearLocalStorage } from "@/utils/utils";

/** Setup an API instance */
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_HOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * Add authorization headers to API calls
 * @param {InternalAxiosRequestConfig} requestConfig
 */
const authInterceptor = (requestConfig: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    requestConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return requestConfig;
};

/** Add responseInterceptor */
const responseInterceptor = (response: AxiosResponse) => {
  if (response.config) {
    return response.data;
  }
  return response;
};

/** Add errorInterceptor */
const errorInterceptor = (axiosError: AxiosError) => {
  if (axiosError?.response?.status) {
    switch (axiosError.response?.status) {
      case ApiStatusCodes.UNAUTHORIZED:
        if (axiosError.response?.config?.url !== AuthEndpoints.LOGIN()) {
          handleClearLocalStorage();
          window.location.reload();
        }
        break;
      case ApiStatusCodes.FORBIDDEN:
        console.log(123);
        break;
      case ApiStatusCodes.NOT_FOUND:
        window.location.assign(AdminsPathsEnum.NOT_FOUND);
        break;
      case 429:
        openNotification({
          message: t("MSG_TIME_OUT", { ns: "message" }),
          className: "pre-wrap",
        });
        break;
      case 500:
        openNotification({
          message: t("MSG_SERVER_ERROR", { ns: "message" }),
          className: "pre-wrap",
        });
        break;
      default:
        break;
    }
  }
  throw axiosError?.response?.data;
};

/** Function that will be called to refresh authorization  */
const refreshAuthLogic = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return api
    .post(AuthEndpoints.REFRESH_TOKEN(), {
      refreshToken,
    })
    .then(tokenRefreshResponse => {
      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        tokenRefreshResponse?.data?.accessToken
      );
      return Promise.resolve();
    })
    .catch(() => Promise.reject());
};

/** Add refresh token interceptor */
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [ApiStatusCodes.EXPIRED_TOKEN],
});

/** Add interceptor */
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
