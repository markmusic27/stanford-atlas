interface BaseItem {
  createdAt: Date;
  id: string;
}

interface MessagePayload {
  content: string;
}

interface ResponsePayload {
  content: string;
  model: string;
  tokens: number;
  cost: number;
}

interface ErrorPayload {
  content: string;
  error: string;
}

export type StreamItem =
  | (BaseItem & { type: "message"; payload: MessagePayload })
  | (BaseItem & { type: "response"; payload: ResponsePayload })
  | (BaseItem & { type: "error"; payload: ErrorPayload });

type StreamItemOf<T extends StreamItem["type"]> = Extract<
  StreamItem,
  { type: T }
>;

export type MessageItem = StreamItemOf<"message">;
export type ErrorItem = StreamItemOf<"error">;
export type ResponseItem = StreamItemOf<"response">;
