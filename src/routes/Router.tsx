import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from "../layouts/full/shared/loadable/Loadable";

const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const ModernDashboard = Loadable(lazy(() => import("../views/dashboards/modern")));
const SimulationLanding = Loadable(lazy(() => import("../views/simulation")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <SimulationLanding />,
  },
  {
    path: "/dashboard",
    element: <FullLayout />,
    children: [
      {
        index: true,
        element: <ModernDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
