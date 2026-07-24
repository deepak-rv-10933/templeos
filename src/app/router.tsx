import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';
import { AdminLayout } from '@/layouts/AdminLayout';

/* Route-based code splitting (spec §19). Pages use named exports, so we map
   them to a default for React.lazy. */
const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const ExplorePage = lazy(() =>
  import('@/pages/ExplorePage').then((m) => ({ default: m.ExplorePage })),
);
const UpdatesPage = lazy(() =>
  import('@/pages/UpdatesPage').then((m) => ({ default: m.UpdatesPage })),
);
const BookingsPage = lazy(() =>
  import('@/pages/BookingsPage').then((m) => ({ default: m.BookingsPage })),
);
const BookingDetailPage = lazy(() =>
  import('@/pages/BookingDetailPage').then((m) => ({ default: m.BookingDetailPage })),
);
const MyTemplePage = lazy(() =>
  import('@/pages/MyTemplePage').then((m) => ({ default: m.MyTemplePage })),
);
const TempleProfilePage = lazy(() =>
  import('@/pages/TempleProfilePage').then((m) => ({ default: m.TempleProfilePage })),
);
const RouteDetailPage = lazy(() =>
  import('@/pages/RouteDetailPage').then((m) => ({ default: m.RouteDetailPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

const AdminDashboard = lazy(() =>
  import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
);
const AdminTemples = lazy(() =>
  import('@/pages/admin/AdminTemples').then((m) => ({ default: m.AdminTemples })),
);
const AdminBookings = lazy(() =>
  import('@/pages/admin/AdminBookings').then((m) => ({ default: m.AdminBookings })),
);
const AdminAnalytics = lazy(() =>
  import('@/pages/admin/AdminAnalytics').then((m) => ({ default: m.AdminAnalytics })),
);
const AdminServices = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminServices })),
);
const AdminDonations = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminDonations })),
);
const AdminRenovation = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminRenovation })),
);
const AdminSponsors = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminSponsors })),
);
const AdminUsers = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminUsers })),
);
const AdminReports = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminReports })),
);
const AdminSettings = lazy(() =>
  import('@/pages/admin/placeholders').then((m) => ({ default: m.AdminSettings })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'updates', element: <UpdatesPage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'bookings/:id', element: <BookingDetailPage /> },
      { path: 'my-temple', element: <MyTemplePage /> },
      { path: 'temple/:slug', element: <TempleProfilePage /> },
      { path: 'routes/:id', element: <RouteDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'temples', element: <AdminTemples /> },
      { path: 'bookings', element: <AdminBookings /> },
      { path: 'services', element: <AdminServices /> },
      { path: 'donations', element: <AdminDonations /> },
      { path: 'renovation', element: <AdminRenovation /> },
      { path: 'sponsors', element: <AdminSponsors /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'reports', element: <AdminReports /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
]);
