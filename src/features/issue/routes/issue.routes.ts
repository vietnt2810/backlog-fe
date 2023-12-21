import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { IssuePathsEnum } from "../constants/issue.paths";

const DefaultLayout = lazy(
  () => import("@/components/layouts/DefaultLayout/DefaultLayout")
);

const IssuesScreen = lazy(
  () => import("@/features/issue/screens/IssuesScreen/IssuesScreen")
);

const IssueDetailScreen = lazy(
  () => import("@/features/issue/screens/IssueDetailScreen/IssueDetailScreen")
);

const ISSUES_SCREEN: RouteItemDef = {
  id: "Issues",
  path: IssuePathsEnum.ISSUES,
  component: IssuesScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const ISSUE_DETAIL_SCREEN: RouteItemDef = {
  id: "Issue_Detail",
  path: IssuePathsEnum.ISSUE_DETAIL,
  component: IssueDetailScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const ISSUE_ROUTES = [ISSUES_SCREEN, ISSUE_DETAIL_SCREEN];

export default ISSUE_ROUTES;
