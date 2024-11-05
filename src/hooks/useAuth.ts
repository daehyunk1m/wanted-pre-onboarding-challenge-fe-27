import { create } from "zustand";

export const useAuth = create((set) => ({
  authorization: null,
  setToken: (token: string) => set((state) => (state.authorization = token)),
  // resetAuth: () => set((state)=>({authorz}))
}));
