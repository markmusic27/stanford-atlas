import { MagnifyingGlassIcon } from "./components/MagnifyingGlass.icon";

enum IconType {
  MagnifyingGlass = "magnifying_glass",
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
  }
}

const Icon = ({ type, ...props }: { type: IconType } & IconProps) => {
  const Component = getIconComponent(type);
  return Component ? <Component {...(props as IconProps)} /> : null;
};

export default Icon;
export { IconType };
