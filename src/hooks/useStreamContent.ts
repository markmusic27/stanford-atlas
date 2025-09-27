import { useState, useCallback } from "react";
import type { ModelMessage } from "ai";

interface StreamContentResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
}

interface StreamContentError {
  error: string;
}

export const useStreamContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<StreamContentResponse | null>(null);

  const streamContent = useCallback(async (messages: ModelMessage[]) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/stream-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: messages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = (await res.json()) as
        | StreamContentResponse
        | StreamContentError;

      if ("error" in data) {
        throw new Error(data.error);
      }

      setResponse(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    streamContent,
    isLoading,
    error,
    response,
  };
};
