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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
