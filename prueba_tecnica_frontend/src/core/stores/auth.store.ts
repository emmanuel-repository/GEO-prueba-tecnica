import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  username: string | null;
  email: string | null;
  setAuth: (token: string, username: string, email: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: sessionStorage.getItem('token'),
  username: sessionStorage.getItem('username'),
  email: sessionStorage.getItem('email'),

  setAuth: (token, username, email) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
    set({ token, username, email });
  },

  logout: () => {
    sessionStorage.clear();
    set({ token: null, username: null, email: null });
  },

  isAuthenticated: () => !!get().token,
}));
