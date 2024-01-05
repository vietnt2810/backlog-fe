import { FC, LazyExoticComponent, MemoExoticComponent, lazy } from "react";

import { RouteItemDef } from "@/types/route.types";

import { ChatPathsEnum } from "../constants/chat.paths";

const DefaultLayout = lazy(
  () => import("@/components/layouts/DefaultLayout/DefaultLayout")
);

const ChatScreen = lazy(
  () => import("@/features/chat/screens/ChatScreen/ChatScreen")
);

const CHAT_SCREEN: RouteItemDef = {
  id: "ChatScreen",
  path: ChatPathsEnum.CHAT_SCREEN,
  component: ChatScreen,
  layout: DefaultLayout as LazyExoticComponent<MemoExoticComponent<FC>>,
  isPublicRoute: false,
};

const CHAT_ROUTES = [CHAT_SCREEN];

export default CHAT_ROUTES;
