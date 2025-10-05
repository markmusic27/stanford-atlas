import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

type UserStore = {
  isSignedIn: boolean;
  user?: User;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setUser: (user: User | undefined) => void;
  reset: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  isSignedIn: false,
  user: undefined,
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  setUser: (user) => set({ user, isSignedIn: Boolean(user) }),
  reset: () => set({ isSignedIn: false, user: undefined }),
}));
