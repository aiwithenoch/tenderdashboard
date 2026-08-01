import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ModernDashboard = Loadable(lazy(() => import('../views/dashboards/modern')));

const tenderRoutes = [
  '/',
  '/dashboards/modern',
  '/tenders',
  '/applications',
  '/approvals',
  '/submissions',
  '/documents',
  '/company-profile',
  '/analytics',
  '/settings',
];

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      ...tenderRoutes.map((path) => ({ path, element: <ModernDashboard /> })),
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
