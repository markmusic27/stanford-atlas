import { create } from "zustand";
import type { Block } from "~/lib/blocks";

type ChatStore = {
  content: Block[];
  isStreaming: boolean;
  error?: string;
  generated?: unknown;
  append: (newItems: Block[]) => void;
  setContent: (items: Block[]) => void;
  setStreaming: (v: boolean) => void;
  setError: (e?: string) => void;
  setGenerated: (items?: unknown) => void;
  reset: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  content: [],
  isStreaming: false,
  error: undefined,
  generated: undefined,
  append: (newItems) => set({ content: [...get().content, ...newItems] }),
  setContent: (items) => set({ content: items }),
  setStreaming: (v) => set({ isStreaming: v }),
  setError: (e) => set({ error: e }),
  setGenerated: (items) => set({ generated: items }),
  reset: () =>
    set({
      content: [],
      isStreaming: false,
      error: undefined,
      generated: undefined,
    }),
}));
