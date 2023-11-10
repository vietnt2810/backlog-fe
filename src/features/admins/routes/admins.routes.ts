import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { AdminsPathsEnum } from "@/features/admins/constants/admins.paths";
import { RouteItemDef } from "@/types/route.types";

const BlankLayout = lazy(
  () => import("@/components/layouts/BlankLayout/BlankLayout")
);

const NotFoundScreen = lazy(
  () => import("@/features/admins/screens/NotFoundScreen/NotFoundScreen")
);

const TemplateScreen = lazy(
  () => import("@/features/admins/screens/TemplateScreen/TemplateScreen")
);

const CreateAdminScreen = lazy(
  () => import("@/features/admins/screens/CreateAdminScreen/CreateAdminScreen")
);

const AdminsScreen = lazy(
  () => import("@/features/admins/screens/AdminsScreen/AdminsScreen")
);

const NOT_FOUND_SCREEN: RouteItemDef = {
  id: "Not found",
  path: AdminsPathsEnum.NOT_FOUND,
  component: NotFoundScreen,
  layout: BlankLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
};

const TEMPLATE_SCREEN: RouteItemDef = {
  id: "template",
  path: AdminsPathsEnum.TEMPLATE,
  component: TemplateScreen,
  pageTitle: "template.title",
  breadCrumb: [
    { title: "template.register_title" },
    { title: "template.register_title" },
  ],
};

const CREATE_ADMIN_SCREEN: RouteItemDef = {
  id: "AD_7-2",
  path: AdminsPathsEnum.CREATE_ADMIN,
  component: CreateAdminScreen,
  pageTitle: "admins.title",
  breadCrumb: [{ title: "admins.register_title" }],
};

const ADMINS_SCREEN: RouteItemDef = {
  id: "AD_7-1",
  path: AdminsPathsEnum.ADMINS,
  component: AdminsScreen,
  pageTitle: "admins.title",
  breadCrumb: [{ title: "admins.admins_title" }],
};

const ADMIN_ROUTES = [
  NOT_FOUND_SCREEN,
  TEMPLATE_SCREEN,
  CREATE_ADMIN_SCREEN,
  ADMINS_SCREEN,
];

export default ADMIN_ROUTES;
