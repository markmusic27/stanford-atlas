import type { IconType } from "../../icons/Icon";
import Icon from "../../icons/Icon";

interface CardContentItemProps {
  icon?: IconType;
  title?: string;
  value: string;
}

const CardContentItem = ({ icon, title, value }: CardContentItemProps) => {
  return (
    <div className="flex min-h-[18px] flex-row items-center justify-start gap-[8px]">
      {icon && (
        <Icon className="text-secondary-text-4 h-[14px] w-[14px]" type={icon} />
      )}
      {title && (
        <span className="text-secondary-text-4 text-[14px]">{title}</span>
      )}
      <span className="text-secondary-text-1 text-[14px]">{value}</span>
    </div>
  );
};

export default CardContentItem;
