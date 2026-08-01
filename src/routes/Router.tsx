import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import {
  AnalyticsPage,
  ApplicationsPage,
  ApprovalsPage,
  CompanyProfilePage,
  DocumentsPage,
  RouteErrorPage,
  SettingsPage,
  SubmissionsPage,
  TenderDiscoveryPage,
} from '../views/tender/TenderWorkspacePages';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ModernDashboard = Loadable(lazy(() => import('../views/dashboards/modern')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <ModernDashboard /> },
      { path: 'dashboards/modern', element: <Navigate to="/" replace /> },
      { path: 'tenders', element: <TenderDiscoveryPage /> },
      { path: 'applications', element: <ApplicationsPage /> },
      { path: 'approvals', element: <ApprovalsPage /> },
      { path: 'submissions', element: <SubmissionsPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'company-profile', element: <CompanyProfilePage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
