import type { ModelMessage } from "ai";

/**
 * Anthropic's `messages` API requires every `tool_use.input` to be a JSON
 * object (key/value record). When Claude streams a tool-call whose JSON is
 * malformed or fails schema validation, ai@5's parseToolCall keeps `input` as
 * the raw string instead of converting it to an object, which then poisons the
 * conversation history for every subsequent step.
 *
 * These helpers coerce any non-object tool input back into a plain object so
 * the Anthropic provider never sees a stringified input on the way back out.
 */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Best-effort coercion of an arbitrary tool input value into a plain object.
 * Falls back to `{}` whenever a meaningful object can't be recovered.
 */
export function coerceToolInputToObject(
  input: unknown,
): Record<string, unknown> {
  if (isPlainObject(input)) return input;

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed.length === 0) return {};
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (isPlainObject(parsed)) return parsed;
    } catch {
      // fall through to the empty object below
    }
  }

  return {};
}

/**
 * Returns a copy of the given message list with every `tool-call` content part
 * normalized so that its `input` is guaranteed to be a plain object.
 */
export function sanitizeAssistantToolInputs(
  messages: ModelMessage[],
): ModelMessage[] {
  return messages.map((message) => {
    if (message.role !== "assistant") return message;
    if (!Array.isArray(message.content)) return message;

    let mutated = false;
    const nextContent = message.content.map((part) => {
      if (part.type !== "tool-call") return part;
      if (isPlainObject(part.input)) return part;
      mutated = true;
      return { ...part, input: coerceToolInputToObject(part.input) };
    });

    if (!mutated) return message;
    return { ...message, content: nextContent };
  });
}
