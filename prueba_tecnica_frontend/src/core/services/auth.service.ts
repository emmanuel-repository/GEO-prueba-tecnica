import { LoginRequest, RegisterRequest } from "@/core/interfaces/auth.interface";

const BASE_URL = `${import.meta.env.VITE_API}/auth`;

export const authService = {

  async login(data: LoginRequest) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: result.message || "Credenciales incorrectas" };
    }

    return result;
  },

  async register(data: RegisterRequest) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw { status: response.status, message: result.error || "Error al registrar" };
    }

    return result;
  },
};
