export const AuthEndpoints = {
  LOGIN: () => `/signin`,
  REGISTER: () => `/signup`,
  FORGOT_PASSWORD: () => `/admins/forgot_password`,
  CONFIRM_FORGOT_PASSWORD: () => `/admins/confirm-forgot-password`,
  LOGOUT: () => `/admins/logout`,
  REFRESH_TOKEN: () => `/admins/refresh-token`,
};
