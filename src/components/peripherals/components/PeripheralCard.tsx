"use client";

import CursorScale from "~/components/ui/CursorScale";
import Icon, { IconType } from "~/components/ui/icons/Icon";

interface PeripheralCardProps {
  title: string;
  onAction?: (title: string) => Promise<void> | void;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

const PeripheralCard = ({
  title,
  onAction,
  href,
  target = "_self",
}: PeripheralCardProps) => {
  const handleClick = () => {
    if (href) {
      if (target === "_blank") {
        const newWindow = window.open(href, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
      } else {
        window.location.assign(href);
      }
      return;
    }
    if (onAction) void onAction(title);
  };

  return (
    <CursorScale hoverScale={1.01} maxTranslate={1}>
      <div
        className="bg-primary-6/[0.7] flex h-[30px] cursor-pointer flex-row items-center gap-[4px] rounded-[10px] pr-[8px] pl-[10px]"
        onClick={handleClick}
      >
        <Icon
          type={IconType.Slash}
          width={6}
          height={14}
          className="text-primary-8"
        />
        <p className="text-secondary-text-2 text-[14px]">{title}</p>
      </div>
    </CursorScale>
  );
};

export default PeripheralCard;
