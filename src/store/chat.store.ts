import { create } from "zustand";
import type { GeneratedContent } from "~/lib/generatedContent";

type ChatStore = {
  context: GeneratedContent[];
  isStreaming: boolean;
  error?: string;
  append: (newItems: GeneratedContent[]) => void;
  setStreaming: (v: boolean) => void;
  setError: (e?: string) => void;
  reset: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  context: [],
  isStreaming: false,
  error: undefined,
  append: (newItems) => set({ context: [...get().context, ...newItems] }),
  setStreaming: (v) => set({ isStreaming: v }),
  setError: (e) => set({ error: e }),
  reset: () => set({ context: [], isStreaming: false, error: undefined }),
}));
