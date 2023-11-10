import { FC, LazyExoticComponent, MemoExoticComponent } from "react";

export type BreadCrumb = {
  title?: string;
  path?: string;
};

export type RouteItemDef = {
  id: string;
  pageTitle?: string;
  breadCrumb?: BreadCrumb[];
  path: string;
  component: LazyExoticComponent<MemoExoticComponent<() => JSX.Element>>;
  layout?: FC;
  isPublicRoute?: boolean;
};
