import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/core/services/auth.service";
import { useAuthStore } from "@/core/stores/auth.store";
import { LoginRequest } from "@/core/interfaces/auth.interface";
import { useApi } from "@/core/hooks/useApi";
import { ApiError } from "@/core/interfaces/api.interface";

export default function LoginPage() {

  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginRequest>();

  const { refetch } = useApi(
    () => authService.login(getValues()),
    {
      onSuccess: (data) => {
        setIsLoading(true);
        setErrorMsg("");
        setAuth(data.token, data.username, data.email);
        navigate("/list-instruments");
      },
      onError: (error: ApiError) => {
        console.error("Login error:", error);
        setErrorMsg("Credenciales incorrectas, por favor intenta de nuevo.");
      },
      autoFetch: false,
    }
  );

  const onSubmit = () => refetch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">

        <CardHeader>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
            <p className="text-gray-500 mt-1">Instrumentos Musicales</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col space-y-1.5">
              <Label>Usuario:</Label>
              <Input
                placeholder="Ingresa tu usuario"
                {...register('username', { required: "El usuario es requerido" })}
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Contraseña:</Label>
              <Input
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register('password', { required: "La contraseña es requerida" })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
                {errorMsg}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Entrar"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Regístrate
              </span>
            </div>

          </form>
        </CardContent>

      </Card>
    </div>
  );
}
