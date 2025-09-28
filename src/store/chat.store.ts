import { create } from "zustand";
import type { ChatHistory } from "~/app/api/stream-content/schemas";

type ChatStore = {
  isStreaming: boolean;
  errorMessage: string | null;
  chatHistory: ChatHistory[];
  editingId: number;
  setIsStreaming: (isStreaming: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  setEditingId: (editingId: number) => void;
  reset: () => void;
  append: (h: ChatHistory) => void;
  edit: (h: ChatHistory) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  isStreaming: false,
  errorMessage: null,
  chatHistory: [],
  editingId: -1,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setEditingId: (editingId) => set({ editingId }),
  reset: () =>
    set({
      isStreaming: false,
      errorMessage: null,
      chatHistory: [],
      editingId: -1,
    }),
  append: (h: ChatHistory) =>
    set((state) => ({
      editingId: state.chatHistory.length,
      chatHistory: [...state.chatHistory, h],
    })),
  edit: (h: ChatHistory) => {
    const id = get().editingId;
    const currentHistory = get().chatHistory;
    if (id < 0 || id >= currentHistory.length) {
      throw Error("Index out of range.");
    }

    const updatedHistory = [...currentHistory];
    updatedHistory[id] = h;
    set({ chatHistory: updatedHistory });
  },
}));
