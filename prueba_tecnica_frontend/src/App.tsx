import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

const Layout           = lazy(() => import("./pages/main/Layout"));
const LoginPage        = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage     = lazy(() => import('./pages/auth/RegisterPage'));
const MainInstrument   = lazy(() => import('./pages/instruments/MainInstrument'));
const FormInstrument   = lazy(() => import('./pages/instruments/FormInstrument'));
const FormUpdateInstrument = lazy(() => import('./pages/instruments/FormUpdateInstrument'));
const MainEvent        = lazy(() => import('./pages/events/MainEvent'));
const FormEvent        = lazy(() => import('./pages/events/FormEvent'));
const FormUpdateEvent  = lazy(() => import('./pages/events/FormUpdateEvent'));

function App() {

  const router = createBrowserRouter([
    // Rutas públicas
    { path: "/",         element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    // Rutas protegidas
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/list-instruments",  element: <MainInstrument /> },
        { path: "/new-instrument",    element: <FormInstrument /> },
        { path: "/edit-instrument",   element: <FormUpdateInstrument /> },
        { path: "/list-events",       element: <MainEvent /> },
        { path: "/new-event",         element: <FormEvent /> },
        { path: "/edit-event",        element: <FormUpdateEvent /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
