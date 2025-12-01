import { create } from "zustand";

export const useAuthStore = create((set) => ({
 user: localStorage.getItem("user") || null,

 setUser: (user) => {
  localStorage.setItem("user", user);
  set({ user });
 },
 logout: () => {
  localStorage.removeItem("user");
  set({ user: null });
 },
}));

export const useUIStore = create((set) => ({
 toggle: false,
 toggleMenu: () => set((state) => ({ toggle: !state.toggle })),
 openMenu: () => set({ toggle: true }),
 closeMenu: () => set({ toggle: false }),

 // user logout toggle
 showUserMenu: false,
 toggleUserMenu: () => set((s) => ({ showUserMenu: !s.showUserMenu })),
}));
