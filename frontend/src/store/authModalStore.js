import { create } from "zustand";

export const useAuthModal = create((set) => ({
  authModalOpen: false,
  setAuthModalOpen: (value) => set({ authModalOpen: value }),
}))