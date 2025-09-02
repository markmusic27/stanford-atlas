import { MagnifyingGlassIcon } from "./components/MagnifyingGlass.icon";
import { PlusIcon } from "./components/Plus.icon";

enum IconType {
  MagnifyingGlass,
  Plus,
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
  }
}

const Icon = ({ type, ...props }: { type: IconType } & IconProps) => {
  const Component = getIconComponent(type);
  return Component ? <Component {...(props as IconProps)} /> : null;
};

export default Icon;
export { IconType };
