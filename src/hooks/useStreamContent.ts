import { useCallback } from "react";
import type { ModelMessage } from "ai";
import { env } from "~/env";

export const useStreamContent = () => {
  const stream = useCallback(async (message: ModelMessage) => {
    // Set is loading to true
    const messages = [message];
    try {
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

      return 0;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.log(errorMessage);
      throw err;
    } finally {
      console.log("DONE");
    }
  }, []);

  return {
    stream,
  };
};
