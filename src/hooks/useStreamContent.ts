import { useCallback } from "react";
import type { ModelMessage } from "ai";
import { env } from "~/env";
import { Schema } from "~/app/api/stream-content/returnSchema";

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
              const parsed = Schema.partial().safeParse(obj);
              if (parsed.success) {
                console.dir(parsed.data.payload, { depth: null });
              }
            } catch (e) {
              // Ignore malformed lines
            }
          }

          newlineIndex = bufferedText.indexOf("\n");
        }
      }

      // Flush any remaining buffered text
      if (bufferedText.trim().length > 0) {
        try {
          const obj = JSON.parse(bufferedText.trim());
          const parsed = Schema.partial().safeParse(obj);
          console.clear();
          if (parsed.success) {
            console.dir(parsed.data, { depth: null });
          } else {
            console.dir(obj, { depth: null });
          }
        } catch (e) {
          // ignore
        }
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
