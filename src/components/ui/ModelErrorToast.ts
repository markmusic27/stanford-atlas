import { toast } from "sonner";

const modelErrorToast = (message: string, onReport?: () => void) =>
  toast("Model Provider Error", {
    description: message,
    duration: 5000,
    action: {
      label: "Report bug",
      onClick: () => {
        try {
          onReport?.();
        } catch {}
      },
    },
  });

export default modelErrorToast;


