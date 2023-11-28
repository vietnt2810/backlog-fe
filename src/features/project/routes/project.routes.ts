import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { ProjectPathsEnum } from "../constants/project.paths";

const BlankLayout = lazy(
  () => import("@/components/layouts/BlankLayout/BlankLayout")
);

const ProjectHomepageScreen = lazy(
  () =>
    import(
      "@/features/project/screens/ProjectHomepageScreen/ProjectHomepageScreen"
    )
);

const PROJECT_HOMEPAGE_SCREEN: RouteItemDef = {
  id: "Project_Homepage",
  path: ProjectPathsEnum.PROJECT_HOMEPAGE,
  component: ProjectHomepageScreen,
  layout: BlankLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const PROJECT_ROUTES = [PROJECT_HOMEPAGE_SCREEN];

export default PROJECT_ROUTES;
