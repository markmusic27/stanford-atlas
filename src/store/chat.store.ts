import { create } from "zustand";

type ChatStore = {
  isStreaming: boolean;
  errorMessage: string | null;
  setIsStreaming: (isStreaming: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  reset: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  isStreaming: false,
  errorMessage: null,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  reset: () => set({ isStreaming: false, errorMessage: null }),
}));
