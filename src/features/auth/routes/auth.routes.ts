import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import { RouteItemDef } from "@/types/route.types";

const AuthLayout = lazy(
  () => import("@/components/layouts/AuthLayout/AuthLayout")
);

const LoginScreen = lazy(
  () => import("@/features/auth/screens/LoginScreen/LoginScreen")
);

const RegisterScreen = lazy(
  () => import("@/features/auth/screens/RegisterScreen/RegisterScreen")
);

const ConfirmForgotPasswordScreen = lazy(
  () =>
    import(
      "@/features/auth/screens/ConfirmForgotPasswordScreen/ConfirmForgotPasswordScreen"
    )
);

const ForgotPasswordScreen = lazy(
  () =>
    import("@/features/auth/screens/ForgotPasswordScreen/ForgotPasswordScreen")
);

const ForgotPasswordSuccessScreen = lazy(
  () =>
    import(
      "@/features/auth/screens/ForgotPasswordSuccessScreen/ForgotPasswordSuccessScreen"
    )
);

const LOGIN_SCREEN: RouteItemDef = {
  id: "Login", // TODO:  screen code
  path: AuthPathsEnum.LOGIN,
  component: LoginScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const REGISTER_SCREEN: RouteItemDef = {
  id: "Register", // TODO:  screen code
  path: AuthPathsEnum.REGISTER,
  component: RegisterScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const FORGOT_PASSWORD: RouteItemDef = {
  id: "AD_0-2",
  path: AuthPathsEnum.FORGOT_PASSWORD,
  component: ForgotPasswordScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const CONFIRM_FORGOT_PASSWORD_SCREEN: RouteItemDef = {
  id: "AD_0-4",
  path: AuthPathsEnum.CONFIRM_FORGOT_PASSWORD,
  component: ConfirmForgotPasswordScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const FORGOT_PASSWORD_SUCCESS_SCREEN: RouteItemDef = {
  id: "AD_0-5",
  path: AuthPathsEnum.FORGOT_PASSWORD_SUCCESS,
  component: ForgotPasswordSuccessScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const AUTH_ROUTES = [
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  FORGOT_PASSWORD,
  CONFIRM_FORGOT_PASSWORD_SCREEN,
  FORGOT_PASSWORD_SUCCESS_SCREEN,
];

export default AUTH_ROUTES;
