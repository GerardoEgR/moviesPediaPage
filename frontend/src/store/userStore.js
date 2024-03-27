import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  listFavorites: [],
  setUser: (user) => {
    if (user === null) {
      localStorage.removeItem("actkn")
      localStorage.clear()
    } else {
      if (user.token) localStorage.setItem("actkn", user.token)
    }
    set({ user })
  },
  setListFavorites: (list) => set({ listFavorites: list }),
  removeFavorite: (id) => set((state) => ({ listFavorites: state.listFavorites.filter((item) => item.id !== id) })),
  addFavorite: (item) => set((state) => ({ listFavorites: Array.isArray(state.listFavorites) ? [item, ...state.listFavorites] : [item] })),
}))