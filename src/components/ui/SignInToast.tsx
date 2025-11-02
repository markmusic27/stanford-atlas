import { toast } from "sonner";
import { signInWithGoogle } from "~/utils/auth/signIn";

const signInToast = (description: string) =>
  toast("Sign In to Continue", {
    description: description,
    duration: 3500,
    action: {
      label: "Sign In",
      onClick: () => {
        void signInWithGoogle("/");
      },
    },
  });

export default signInToast;
