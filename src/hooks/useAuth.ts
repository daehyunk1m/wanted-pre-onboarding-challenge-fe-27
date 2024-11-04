import { create } from "zustand";

export const useAuth = create((set) => ({
  authorization: null,
  // resetAuth: () => set((state)=>({authorz}))
}));
