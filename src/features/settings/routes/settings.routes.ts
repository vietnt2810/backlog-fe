import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { SettingPathsEnum } from "../constants/settings.path";

const DefaultLayout = lazy(
  () => import("@/components/layouts/DefaultLayout/DefaultLayout")
);

const SettingScreen = lazy(
  () => import("@/features/settings/screens/SettingScreen/SettingScreen")
);

const MembersScreen = lazy(
  () => import("@/features/settings/screens/MembersScreen/MembersScreen")
);

const IssueTypesScreen = lazy(
  () => import("@/features/settings/screens/IssueTypesScreen/IssueTypesScreen")
);

const SETTING_SCREEN: RouteItemDef = {
  id: "SETTING",
  path: SettingPathsEnum.SETTING,
  component: SettingScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const MEMBERS_SCREEN: RouteItemDef = {
  id: "SETTING_MEMBERS",
  path: SettingPathsEnum.MEMBERS,
  component: MembersScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const ISSUE_TYPES_SCREEN: RouteItemDef = {
  id: "ISSUE_TYPES",
  path: SettingPathsEnum.ISSUE_TYPES,
  component: IssueTypesScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const SETTING_ROUTES = [SETTING_SCREEN, MEMBERS_SCREEN, ISSUE_TYPES_SCREEN];

export default SETTING_ROUTES;
