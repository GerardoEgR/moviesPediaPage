import { create } from "zustand";

export const useAppState = create((set) => ({
  appState: "",
  setAppState: (value) => set({ authModalOpen: value }),
}))

// Posiblemente no lo utilice en este proyecto