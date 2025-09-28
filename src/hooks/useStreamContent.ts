import { useCallback } from "react";
import { env } from "~/env";
import {
  ResponseSchema,
  type ChatHistory,
} from "~/app/api/stream-content/returnSchema";
import { useChatStore } from "~/store/chat.store";
import type { ModelMessage } from "ai";

export const useStreamContent = () => {
  const setIsStreaming = useChatStore((s) => s.setIsStreaming);
  const setErrorMessage = useChatStore((s) => s.setErrorMessage);
  const { append, edit } = useChatStore();

  const handleStreamUpdate = (obj: any) => {
    const parsed = ResponseSchema.partial().safeParse(obj);
    if (parsed.success) {
      const data = parsed.data;
      if (data && data.payload) {
        // Only update when we have a payload for the response entry
        edit({ type: "response", payload: data.payload });
      }
    }
  };

  const parseChatHistory = (context: ChatHistory[]): ModelMessage[] => {
    const messages: ModelMessage[] = [];
    for (const entry of context) {
      if (entry.type === "query") {
        messages.push({ role: "user", content: entry.payload });
      } else if (entry.type === "response") {
        messages.push({
          role: "assistant",
          content: JSON.stringify(entry.payload),
        });
      }
    }
    return messages;
  };

  const stream = useCallback(async (query: string) => {
    const { chatHistory } = useChatStore.getState();
    const messages: ModelMessage[] = [
      ...parseChatHistory(chatHistory),
      { role: "user", content: query },
    ];

    // Add query
    append({
      type: "query",
      payload: query,
    });
    // Add response
    append({
      type: "response",
      payload: [],
    });
    try {
      // Set all state values to initial state
      setErrorMessage(null);
      setIsStreaming(true);

      // Request
      const res = await fetch("/api/stream-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_API_SECRET_KEY}`,
        },
        body: JSON.stringify(messages),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // Consume NDJSON stream line by line
      const reader = res.body?.getReader();
      if (!reader) return 0;

      const decoder = new TextDecoder();
      let bufferedText = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        bufferedText += decoder.decode(value, { stream: true });

        let newlineIndex = bufferedText.indexOf("\n");
        while (newlineIndex !== -1) {
          const line = bufferedText.slice(0, newlineIndex).trim();
          bufferedText = bufferedText.slice(newlineIndex + 1);

          if (line.length > 0) {
            try {
              const obj = JSON.parse(line);
              handleStreamUpdate(obj);
            } catch (e) {
              setErrorMessage("An error occurred while processing the stream");
            }
          }

          newlineIndex = bufferedText.indexOf("\n");
        }
      }

      // Flush any remaining buffered text
      if (bufferedText.trim().length > 0) {
        try {
          const obj = JSON.parse(bufferedText.trim());
          handleStreamUpdate(obj);
        } catch (e) {
          setErrorMessage("An error occurred while processing the stream");
        }
      }

      return;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.log(errorMessage);
      setErrorMessage(errorMessage);
      throw err;
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return {
    stream,
  };
};
