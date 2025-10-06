"use client";

import { createClient } from "~/utils/supabase/client";

export async function signInWithGoogle(nextPath = "/") {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://stanfordatlas.com${nextPath}`,
    },
  });

  if (error) throw error;
}
