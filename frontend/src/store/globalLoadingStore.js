import { create } from "zustand";

export const useGlobalLoading = create((set) => ({
  loading: false,
  toggleLoading: (value) => set({ loading: value }),
}))