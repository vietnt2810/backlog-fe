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

const LOGIN_SCREEN: RouteItemDef = {
  id: "Login",
  path: AuthPathsEnum.LOGIN,
  component: LoginScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const REGISTER_SCREEN: RouteItemDef = {
  id: "Register",
  path: AuthPathsEnum.REGISTER,
  component: RegisterScreen,
  layout: AuthLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: true,
};

const AUTH_ROUTES = [LOGIN_SCREEN, REGISTER_SCREEN];

export default AUTH_ROUTES;
