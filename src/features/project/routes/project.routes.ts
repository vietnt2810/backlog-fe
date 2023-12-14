import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { ProjectPathsEnum } from "../constants/project.paths";

const BlankLayout = lazy(
  () => import("@/components/layouts/BlankLayout/BlankLayout")
);

const DefaultLayout = lazy(
  () => import("@/components/layouts/DefaultLayout/DefaultLayout")
);

const ProjectHomepageScreen = lazy(
  () =>
    import(
      "@/features/project/screens/ProjectHomepageScreen/ProjectHomepageScreen"
    )
);

const SubProjectHomepageScreen = lazy(
  () =>
    import(
      "@/features/project/screens/SubProjectHomepageScreen/SubProjectHomepageScreen"
    )
);

const PROJECT_HOMEPAGE_SCREEN: RouteItemDef = {
  id: "Project_Homepage",
  path: ProjectPathsEnum.PROJECT_HOMEPAGE,
  component: ProjectHomepageScreen,
  layout: BlankLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const SUB_PROJECT_HOMEPAGE_SCREEN: RouteItemDef = {
  id: "Sub_Project_Homepage",
  path: ProjectPathsEnum.SUB_PROJECT_HOMEPAGE,
  component: SubProjectHomepageScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const PROJECT_ROUTES = [PROJECT_HOMEPAGE_SCREEN, SUB_PROJECT_HOMEPAGE_SCREEN];

export default PROJECT_ROUTES;
