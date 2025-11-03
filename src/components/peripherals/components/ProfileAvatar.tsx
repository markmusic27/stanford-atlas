"use client";

import CursorScale from "~/components/ui/CursorScale";
import { toast } from "sonner";
import { useUserStore } from "~/stores/user.store";
import { extractUserData } from "~/lib/utils";
import Image from "next/image";

const ProfileAvatar = () => {
  const isSignedIn = useUserStore((s) => s.isSignedIn);
  const user = useUserStore((s) => s.user);
  const { displayName, avatarUrl } = extractUserData(user);

  if (!isSignedIn || !avatarUrl) return null;

  return (
    <CursorScale hoverScale={1.01} maxTranslate={1}>
      <div
        className="border-primary-7 h-[28px] w-[28px] cursor-pointer overflow-hidden rounded-full border shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]"
        aria-label="User profile picture"
        onClick={() =>
          toast(`Successfully Signed In`, {
            description: `Welcome back, ${displayName}!`,
            duration: 3500,
          })
        }
      >
        <Image
          src={avatarUrl}
          alt="Profile picture"
          width={28}
          height={28}
          className="bg-primary-6 h-full w-full object-cover"
        />
      </div>
    </CursorScale>
  );
};

export default ProfileAvatar;
