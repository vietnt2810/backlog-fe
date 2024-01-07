import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { NotFoundPathsEnum } from "../constants/notFound.paths";

const BlankLayout = lazy(
  () => import("@/components/layouts/BlankLayout/BlankLayout")
);

const NotFoundScreen = lazy(
  () => import("@/features/notFound/screens/NotFoundScreen/NotFoundScreen")
);

const NOT_FOUND_SCREEN: RouteItemDef = {
  id: "Not found",
  path: NotFoundPathsEnum.NOT_FOUND,
  component: NotFoundScreen,
  layout: BlankLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
};

const NOT_FOUND_ROUTES = [NOT_FOUND_SCREEN];

export default NOT_FOUND_ROUTES;
