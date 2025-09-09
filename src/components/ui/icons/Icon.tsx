import { ArrowUpIcon } from "./components/ArrowUp.icon";
import { ChevronIcon } from "./components/Chevron.icon";
import { MagnifyingGlassIcon } from "./components/MagnifyingGlass.icon";
import { PlusIcon } from "./components/Plus.icon";
import { SlashIcon } from "./components/Slash.icon";

enum IconType {
  MagnifyingGlass,
  Plus,
  ArrowUp,
  Slash,
  Chevron,
}

export interface IconProps {
  height?: number;
  width?: number;
  className?: string;
}

function getIconComponent(type: IconType) {
  switch (type) {
    case IconType.MagnifyingGlass:
      return MagnifyingGlassIcon;
    case IconType.Plus:
      return PlusIcon;
    case IconType.ArrowUp:
      return ArrowUpIcon;
    case IconType.Slash:
      return SlashIcon;
    case IconType.Chevron:
      return ChevronIcon;
  }
}

const Icon = ({ type, ...props }: { type: IconType } & IconProps) => {
  const Component = getIconComponent(type);
  return Component ? <Component {...(props as IconProps)} /> : null;
};

export default Icon;
export { IconType };
