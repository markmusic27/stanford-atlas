"use client";

import CursorScale from "~/components/ui/CursorScale";
import Icon, { IconType } from "~/components/ui/icons/Icon";

interface PeripheralCardProps {
  title: string;
  onAction?: (title: string) => Promise<void>;
}

const PeripheralCard = ({ title, onAction }: PeripheralCardProps) => {
  return (
    <CursorScale hoverScale={1.01} maxTranslate={1}>
      <div
        className="bg-primary-6/[0.7] flex h-[30px] cursor-pointer flex-row items-center gap-[4px] rounded-[10px] pr-[8px] pl-[10px]"
        onClick={() => {
          if (onAction) void onAction(title);
        }}
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
