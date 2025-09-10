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
