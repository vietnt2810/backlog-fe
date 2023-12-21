import { FC } from "react";

export type BreadCrumb = {
  title?: string;
  path?: string;
};

export type RouteItemDef = {
  id: string;
  pageTitle?: string;
  breadCrumb?: BreadCrumb[];
  path: string;
  component: any;
  layout?: FC;
  isPublicRoute?: boolean;
};
