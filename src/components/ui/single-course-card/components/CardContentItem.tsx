import type { IconType } from "../../icons/Icon";
import Icon from "../../icons/Icon";

interface CardContentItemProps {
  icon?: IconType;
  title?: string;
  value: string;
}

const CardContentItem = ({ icon, title, value }: CardContentItemProps) => {
  return (
    <div className="flex h-[18px] flex-row items-center justify-start gap-[8px]">
      {icon && (
        <Icon className="text-secondary-text-4 h-[14px] w-[14px]" type={icon} />
      )}
      {title && <p className="text-secondary-text-4 text-[14px]">{title}</p>}
      <p className="text-secondary-text-1 text-[14px]">{value}</p>
    </div>
  );
};

export default CardContentItem;
