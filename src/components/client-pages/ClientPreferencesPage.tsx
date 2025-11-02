"use client";

import { useEffect, useState } from "react";
import PersonalizationField from "../personalization-field/PersonalizationField";
import Card from "../ui/card/Card";
import Logo from "../ui/Logo";
import SaveButton from "../ui/SaveButton";
import { useRouter } from "next/navigation";
import { createClient } from "~/utils/supabase/client";
import { useUserStore } from "~/stores/user.store";
import { toast } from "sonner";

type UserPreferences = {
  major: string;
  interests: string;
  future: string;
};

const ClientPreferencesPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const user = useUserStore((state) => state.user);
  const [preferences, setPreferences] = useState<UserPreferences | undefined>(
    undefined,
  );
  const [saving, setSaving] = useState(false);

  async function handleRouter(): Promise<void> {
    router.push("/");
  }

  useEffect(() => {
    setSaving(false);
    fetchUserPreferences();
  }, [user?.id, supabase]);

  const createUserPreferences = async (userId: string) => {
    const { error: insertError } = await supabase
      .from("user_preferences")
      .insert({
        user_id: userId,
        major: "",
        interests: "",
        future: "",
      });

    if (insertError) {
      throw insertError;
    }
  };

  const fetchUserPreferences = async (): Promise<void> => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      // Check if error is due to missing preferences (PGRST116 or similar)
      const isMissingPreferences =
        error.code === "PGRST116" ||
        error.message?.toLowerCase().includes("no rows") ||
        error.message?.toLowerCase().includes("not found");

      if (isMissingPreferences) {
        // Create preferences with toast.promise
        await toast.promise(createUserPreferences(user.id), {
          loading: "Creating preferences...",
          success: "Preferences created",
          error: (err: unknown) => {
            console.error("Failed to create preferences:", err);
            const message =
              err instanceof Error
                ? err.message
                : String(err ?? "Unknown error");
            return `Failed to create preferences: ${message.split(" ").slice(0, 15).join(" ")}`;
          },
        });

        // Fetch again after creating
        const { data: newData, error: refetchError } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (refetchError) {
          toast("Failed to load preferences", {
            duration: 5000,
            description: (refetchError.message ?? "Unknown error")
              .split(" ")
              .slice(0, 15)
              .join(" "),
          });
          console.error(
            "Failed to load preferences after creation:",
            refetchError,
          );
          return;
        }

        setPreferences(newData as UserPreferences);
        return;
      }

      // Some other error
      toast("Failed to load preferences", {
        duration: 5000,
        description: (error.message ?? "Unknown error")
          .split(" ")
          .slice(0, 15)
          .join(" "),
      });
      console.error("Failed to load preferences:", error);
      return;
    }

    let prefs: UserPreferences;
    try {
      prefs = data as UserPreferences;
    } catch (err) {
      toast("Failed to parse preferences", {
        duration: 5000,
        description: ((err as Error).message ?? "Unknown error")
          .split(" ")
          .slice(0, 15)
          .join(" "),
      });
      console.error("Failed to parse preferences:", err);
      return;
    }

    setPreferences(prefs);
  };

  const handleSavePreferences = async (): Promise<boolean> => {
    if (preferences === undefined) return false;
    if (!user?.id) return false;
    const { error } = await supabase
      .from("user_preferences")
      .update(preferences)
      .eq("user_id", user.id);

    if (error) {
      toast("Failed to save preferences", {
        duration: 5000,
        description: (error.message ?? "Unknown error")
          .split(" ")
          .slice(0, 15)
          .join(" "),
      });
      console.error("Failed to save preferences:", error);
      return false;
    }

    toast("Preferences saved successfully", {
      description: "Your personalization settings have been updated.",
      duration: 3500,
    });

    return true;
  };

  return (
    <main className="w-full">
      <div className="mx-auto flex h-full w-full max-w-[660px] flex-col px-[12px]">
        <div className="h-[6dvh] max-h-[60px] min-h-[20px]" />
        <div onClick={handleRouter} className="cursor-pointer">
          <Logo />
        </div>
        <div className="h-[6dvh] max-h-[60px] min-h-[20px]" />
        <p className="text-primary-text text-[22px]">Personalization</p>
        <div className="h-[8px]" />
        <p className="text-secondary-text-2 text-[16px]">
          More context on you leads to better course recommendations and
          planning abilities. We don&apos;t store grades (nor will we ask for
          them).
        </p>
        <div className="h-[28px]" />
        <Card
          title="Enable Course Memory Feature"
          preventToggle={true}
          onToggle={() => {
            toast("This feature is not available yet", {
              duration: 5000,
              description: "Sign up for early access!"
                .split(" ")
                .slice(0, 15)
                .join(" "),
              action: {
                label: "Get Access",
                onClick: () => {
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLScJHq_sfozpOV5A8Kavwn3_YBjGR6K2ZRrrjFx8vb_27zkL6Q/viewform?usp=header",
                    "_blank",
                  );
                },
              },
            });
          }}
          description="This allows the Atlas AI to remember what courses you've taken, providing you with better guidance on which courses to take later."
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="What's your major—or your best guess?"
          defaultValue={preferences?.major}
          onUpdate={(value) => {
            if (preferences) {
              setPreferences({ ...preferences, major: value });
            }
          }}
          placeholder="It doesn't matter if you haven't declared. Describe what you're interested in studying at Stanford here."
          loading={preferences === undefined}
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="Have any interests?"
          defaultValue={preferences?.interests}
          onUpdate={(value) => {
            if (preferences) {
              setPreferences({ ...preferences, interests: value });
            }
          }}
          placeholder="Don't just include the academic! Clubs, causes, scenes you're into. Steve Jobs' favorite class was calligraphy. Weird interests can lead you to discover what could be your favorite class."
          loading={preferences === undefined}
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="What do you want to be when you grow up?"
          defaultValue={preferences?.future}
          onUpdate={(value) => {
            if (preferences) {
              setPreferences({ ...preferences, future: value });
            }
          }}
          placeholder="Think in verbs, not titles: build, discover, teach, etc. Tell us the kinds of problems you want to tackle, who you hope to help, and the setting you imagine (lab, startup, classroom, clinic, stage, etc)."
          loading={preferences === undefined}
        />
        <div className="h-[28px]" />
        <SaveButton
          text="Save Preferences"
          loading={saving}
          className="mx-auto"
          onClick={async () => {
            setSaving(true);
            let success = await handleSavePreferences();
            if (!success) return;
            handleRouter();
          }}
        />
        <div className="h-[8dvh] max-h-[80px] min-h-[30px]" />
      </div>
    </main>
  );
};

export default ClientPreferencesPage;
