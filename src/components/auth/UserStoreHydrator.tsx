"use client";

import { useEffect } from "react";
import { createClient } from "~/utils/supabase/client";
import { useUserStore } from "~/stores/user.store";

export default function UserStoreHydrator() {
  useEffect(() => {
    const supabase = createClient();

    let isMounted = true;

    const ensureUserPreferences = async (userId: string) => {
      try {
        const { error: selectError } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (selectError) {
          // Preferences don't exist, create them
          const { error: insertError } = await supabase
            .from("user_preferences")
            .insert({
              user_id: userId,
              major: "",
              interests: "",
              future: "",
            });

          if (insertError) {
            console.error("Error creating user preferences:", insertError);
          }
        }
      } catch (error) {
        console.error("Error ensuring user preferences:", error);
      }
    };

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!isMounted) return;
        useUserStore.getState().setUser(data.user ?? undefined);
        if (data.user) {
          ensureUserPreferences(data.user.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        useUserStore.getState().setUser(session?.user ?? undefined);
        if (session?.user) {
          ensureUserPreferences(session.user.id);
        }
      },
    );

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return null;
}
