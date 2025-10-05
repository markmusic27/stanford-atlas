"use client";

import { createClient } from "~/utils/supabase/client";

/**
 * Initiates Google OAuth sign-in and redirects back to `nextPath` after login.
 * Relies on middleware + SSR client to exchange the auth code and set cookies.
 */
export async function signInWithGoogle(nextPath: string = "/") {
  const supabase = createClient();
  const origin = window.location.origin;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}${nextPath}`,
      // If you need offline access to Google APIs, add:
      // queryParams: { access_type: "offline", prompt: "consent" },
    },
  });

  if (error) throw error;
}
