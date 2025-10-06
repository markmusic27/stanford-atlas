import type { User } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isoToUSDate(input: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!m) return "invalid";

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);

  // Construct in UTC to avoid timezone shifts (e.g., near midnight)
  const dt = new Date(Date.UTC(year, month - 1, day));

  const isValid =
    dt.getUTCFullYear() === year &&
    dt.getUTCMonth() === month - 1 &&
    dt.getUTCDate() === day;

  if (!isValid) return "invalid";

  return `${month}/${day}/${year}`;
}

export function extractUserData(user: User | undefined): {
  displayName: string;
  avatarUrl: string;
} {
  type UserMetadataStringKey =
    | "avatar_url"
    | "picture"
    | "full_name"
    | "name"
    | "display_name"
    | "preferred_username";

  const metadata = user?.user_metadata as Record<string, unknown> | undefined;

  const getString = (
    meta: Record<string, unknown> | undefined,
    key: UserMetadataStringKey,
  ): string | undefined => {
    const value = meta?.[key];
    return typeof value === "string" ? value : undefined;
  };

  const avatarUrl =
    getString(metadata, "avatar_url") ?? getString(metadata, "picture") ?? "";

  const displayName =
    getString(metadata, "full_name") ??
    getString(metadata, "name") ??
    getString(metadata, "display_name") ??
    getString(metadata, "preferred_username") ??
    user?.email ??
    "User";

  return { displayName, avatarUrl };
}
