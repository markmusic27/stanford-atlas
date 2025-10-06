"use client";

import { createClient } from "~/utils/supabase/client";

export async function signInWithGoogle(nextPath = "/") {
  const supabase = createClient();
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin =
    envSiteUrl && envSiteUrl.length > 0 ? envSiteUrl : window.location.origin;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}${nextPath}`,
    },
  });

  if (error) throw error;
}
