"use client";

import { createClient } from "~/utils/supabase/client";

export async function signInWithGoogle(nextPath = "/") {
  const supabase = createClient();
  const origin = window.location.origin;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}${nextPath}`,
    },
  });

  if (error) throw error;
}
