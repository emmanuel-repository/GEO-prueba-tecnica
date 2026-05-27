import React, { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/core/stores/auth.store";
import { Button } from "@/components/ui/button";

const Layout: React.FC = () => {
  const { username, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
        
        <span className="text-lg font-bold cursor-pointer" onClick={() => navigate("/list-instruments")}  >
          🎸 Instrumentos Musicales
        </span>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Hola, <strong>{username}</strong></span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-grow">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>

    </div>
  );
};

export default Layout;
