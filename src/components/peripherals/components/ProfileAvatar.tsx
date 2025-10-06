"use client";

import CursorScale from "~/components/ui/CursorScale";
import { toast } from "sonner";
import { useUserStore } from "~/stores/user.store";
import { extractUserData } from "~/lib/utils";

const ProfileAvatar = () => {
  const isSignedIn = useUserStore((s) => s.isSignedIn);
  const user = useUserStore((s) => s.user);
  const { displayName, avatarUrl } = extractUserData(user);

  if (!isSignedIn || !avatarUrl) return null;

  return (
    <CursorScale hoverScale={1.01} maxTranslate={1}>
      <div
        className="h-[28px] w-[28px] cursor-pointer overflow-hidden rounded-full border border-[#D1D1D1] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]"
        aria-label="User profile picture"
        onClick={() => toast(`Signed in as ${displayName}`)}
      >
        <img
          src={avatarUrl}
          alt="Profile picture"
          width={28}
          height={28}
          className="h-full w-full object-cover"
        />
      </div>
    </CursorScale>
  );
};

export default ProfileAvatar;
