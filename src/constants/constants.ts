import { AdminsPathsEnum } from "@/features/admins/admins";
import { SidebarInfo } from "@/types/sidebar.types";

export const MENU_SIDEBAR: SidebarInfo[] = [
  {
    key: "7",
    label: "menu.admins",
    path: AdminsPathsEnum.ADMINS,
  },
];

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const OPTION_PER_PAGE = [10, 20, 30, 40, 50];
