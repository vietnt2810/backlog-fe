import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { DashboardPathsEnum } from "../constants/dashboard.paths";

const BlankLayout = lazy(
  () => import("@/components/layouts/BlankLayout/BlankLayout")
);

const DashboardScreen = lazy(
  () => import("@/features/dashboard/screens/DashboardScreen/DashboardScreen")
);

const UserProfileScreen = lazy(
  () => import("@/features/dashboard/screens/UserProfile/UserProfile")
);

const DASHBOARD_SCREEN: RouteItemDef = {
  id: "Dashboard",
  path: DashboardPathsEnum.DASHBOARD,
  component: DashboardScreen,
  layout: BlankLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const USER_PROFILE_SCREEN: RouteItemDef = {
  id: "Profile",
  path: DashboardPathsEnum.USER_PROFILE,
  component: UserProfileScreen,
  layout: BlankLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const DASHBOARD_ROUTES = [DASHBOARD_SCREEN, USER_PROFILE_SCREEN];

export default DASHBOARD_ROUTES;
