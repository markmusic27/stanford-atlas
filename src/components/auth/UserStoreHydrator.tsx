"use client";

import { useEffect } from "react";
import { createClient } from "~/utils/supabase/client";
import { useUserStore } from "~/stores/user.store";

export default function UserStoreHydrator() {
  useEffect(() => {
    const supabase = createClient();

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      useUserStore.getState().setUser(data.user ?? undefined);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        useUserStore.getState().setUser(session?.user ?? undefined);
      },
    );

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return null;
}
