export type NormalizedError = {
  message: string;
  provider?: "mistral" | "openai" | "anthropic";
  statusCode?: number;
  code?: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getObject(
  obj: Record<string, unknown>,
  key: string,
): Record<string, unknown> | undefined {
  const value = obj[key];
  return isObject(value) ? value : undefined;
}

function getString(
  obj: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = obj[key];
  return typeof value === "string" ? value : undefined;
}

function getNumber(
  obj: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = obj[key];
  return typeof value === "number" ? value : undefined;
}

export const normalizeError = (unknownErr: unknown): NormalizedError => {
  let baseMessage = "Unexpected error occurred";
  let provider: NormalizedError["provider"];
  let statusCode: number | undefined;
  let code: string | undefined;

  if (isObject(unknownErr)) {
    const errObj = unknownErr;
    const last = getObject(errObj, "lastError") ?? errObj;

    const lastData = getObject(last, "data");
    const lastReq = getObject(last, "requestBodyValues");
    const errReq = getObject(errObj, "requestBodyValues");

    const providerMsg = lastData ? getString(lastData, "message") : undefined;
    const directMsg = getString(errObj, "message");
    if (providerMsg && providerMsg.length > 0) {
      baseMessage = providerMsg;
    } else if (directMsg && directMsg.length > 0) {
      baseMessage = directMsg;
    }

    const url = getString(last, "url") ?? getString(errObj, "url");
    const modelName =
      (lastReq ? getString(lastReq, "model") : undefined) ??
      (errReq ? getString(errReq, "model") : undefined);

    if (typeof url === "string") {
      if (url.includes("mistral.ai")) provider = "mistral";
      else if (url.includes("openai.com")) provider = "openai";
      else if (url.includes("anthropic.com")) provider = "anthropic";
    } else if (typeof modelName === "string") {
      if (modelName.includes("mistral")) provider = "mistral";
      else if (modelName.includes("gpt")) provider = "openai";
      else if (modelName.includes("claude")) provider = "anthropic";
    }

    statusCode =
      getNumber(last, "statusCode") ?? getNumber(errObj, "statusCode");
    code =
      (lastData ? getString(lastData, "code") : undefined) ??
      getString(errObj, "code");
  }

  const message = provider ? `${provider}: ${baseMessage}` : baseMessage;
  return { message, provider, statusCode, code } as const;
};
