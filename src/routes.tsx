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
import { AdminsPathsEnum } from "@/features/admins/constants/admins.paths";
import ADMIN_ROUTES from "@/features/admins/routes/admins.routes";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import AUTH_ROUTES from "@/features/auth/routes/auth.routes";
import { RouteItemDef } from "@/types/route.types";

import { DashboardPathsEnum } from "./features/dashboard/constants/dashboard.paths";
import DASHBOARD_ROUTES from "./features/dashboard/routes/dashboard.routes";

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
    <RouteLayout pageTitle={route.pageTitle} breadCrumb={route.breadCrumb}>
      <Component />
    </RouteLayout>
  );
};

const AppRoutes = () => {
  const ROUTE_LIST: RouteItemDef[] = [
    ...AUTH_ROUTES,
    ...DASHBOARD_ROUTES,
    ...ADMIN_ROUTES,
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
            element={<Navigate to={AdminsPathsEnum.NOT_FOUND} replace />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
