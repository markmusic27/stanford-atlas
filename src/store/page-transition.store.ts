import { create } from "zustand";

type PageTransitionStore = {
  queuedTransition: boolean;
  enqueue: () => void;
  dequeue: () => void;
};

export const usePageTransitionStore = create<PageTransitionStore>((set) => ({
  queuedTransition: false,
  enqueue: () => set({ queuedTransition: true }),
  dequeue: () => set({ queuedTransition: false }),
}));
