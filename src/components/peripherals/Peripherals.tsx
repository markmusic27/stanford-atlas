"use client";

import { toast } from "sonner";
import PeripheralCard from "./components/PeripheralCard";
import ProfileAvatar from "./components/ProfileAvatar";
import { createClient } from "~/utils/supabase/client";
import { signInWithGoogle } from "~/utils/auth/signIn";
import { useUserStore } from "~/stores/user.store";

interface PeripheralsProps {
  onWhyUseClick: () => void;
}

const Peripherals = ({ onWhyUseClick }: PeripheralsProps) => {
  const isSignedIn = useUserStore((s) => s.isSignedIn);
  const user = useUserStore((s) => s.user);

  return (
    <div
      className={`flex flex-row flex-wrap items-center justify-center gap-[6px]`}
    >
      <ProfileAvatar />

      <PeripheralCard
        title={isSignedIn ? "Sign Out" : "Sign In"}
        onClick={async () => {
          try {
            if (isSignedIn) {
              const supabase = createClient();
              const { error } = await supabase.auth.signOut();
              if (error) throw error;
              toast("Successfully Signed Out", {
                description: "You can sign in again to continue.",
                duration: 3500,
              });
            } else {
              await signInWithGoogle("/");
            }
          } catch (err) {
            toast("Error authenticating your account.", {
              description:
                "Error: " +
                ((err as Error).message ?? "Unknown error")
                  .split(" ")
                  .slice(0, 10)
                  .join(" "),
              duration: 3500,
            });
          }
        }}
      />
      <PeripheralCard
        title={"Build a 4-year plan"}
        href="https://docs.google.com/forms/d/e/1FAIpQLScJHq_sfozpOV5A8Kavwn3_YBjGR6K2ZRrrjFx8vb_27zkL6Q/viewform?usp=header"
      />
      <PeripheralCard
        title={"Why this over OnCourse or ChatGPT"}
        onClick={onWhyUseClick}
      />

      <PeripheralCard
        title={"GitHub"}
        href="https://github.com/markmusic27/stanford-atlas"
      />
    </div>
  );
};

export default Peripherals;
