import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TauthState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useAuthStore = create<TauthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token: string) => set((state) => ({ token: (state.token = token) })),
        // resetAuth: () => set((state)=>({authorz}))
      }),
      {
        name: "token-storage",
      }
    )
  )
);
