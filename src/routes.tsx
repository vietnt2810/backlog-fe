import { Suspense, lazy, useContext } from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AuthenticationContext } from "@/components/organisms/AuthenticationProvider/AuthenticationProvider";
import Loader from "@/components/organisms/Loader/Loader";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import AUTH_ROUTES from "@/features/auth/routes/auth.routes";
import { RouteItemDef } from "@/types/route.types";

import CHAT_ROUTES from "./features/chat/routes/chat.routes";
import { DashboardPathsEnum } from "./features/dashboard/constants/dashboard.paths";
import DASHBOARD_ROUTES from "./features/dashboard/routes/dashboard.routes";
import ISSUE_ROUTES from "./features/issue/routes/issue.routes";
import { NotFoundPathsEnum } from "./features/notFound/constants/notFound.paths";
import NOT_FOUND_ROUTES from "./features/notFound/routes/notFound.routes";
import PROJECT_ROUTES from "./features/project/routes/project.routes";
import SETTING_ROUTES from "./features/settings/routes/settings.routes";

const DefaultLayout = lazy(
  () => import("@/components/layouts/DefaultLayout/DefaultLayout")
);

const RouteWrapper = ({ route }: { route: RouteItemDef }) => {
  const Component = route.component;
  const RouteLayout = route.layout ?? DefaultLayout;

  const { accessToken } = useContext(AuthenticationContext);
  const location = useLocation();

  if (route?.isPublicRoute && accessToken) {
    return <Navigate to={DashboardPathsEnum.DASHBOARD} replace />;
  }

  if (!route?.isPublicRoute && !accessToken) {
    return (
      <Navigate to={AuthPathsEnum.LOGIN} state={{ from: location }} replace />
    );
  }

  return (
    <RouteLayout>
      <Component />
    </RouteLayout>
  );
};

const AppRoutes = () => {
  const ROUTE_LIST: RouteItemDef[] = [
    ...NOT_FOUND_ROUTES,
    ...AUTH_ROUTES,
    ...DASHBOARD_ROUTES,
    ...PROJECT_ROUTES,
    ...ISSUE_ROUTES,
    ...SETTING_ROUTES,
    ...CHAT_ROUTES,
  ];

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          {ROUTE_LIST.map(route => (
            <Route
              key={route.id}
              path={route.path}
              element={<RouteWrapper route={route} />}
            />
          ))}
          <Route
            path="*"
            element={<Navigate to={NotFoundPathsEnum.NOT_FOUND} replace />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
