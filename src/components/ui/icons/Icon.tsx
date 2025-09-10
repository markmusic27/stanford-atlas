import { ArrowUpIcon } from "./components/ArrowUp.icon";
import { CalendarIcon } from "./components/Calendar.icon";
import { ChevronIcon } from "./components/Chevron.icon";
import { ClockIcon } from "./components/Clock.icon";
import { GlobeIcon } from "./components/Globe.icon";
import { LocationIcon } from "./components/Location.icon";
import { MagnifyingGlassIcon } from "./components/MagnifyingGlass.icon";
import { PlusIcon } from "./components/Plus.icon";
import { SlashIcon } from "./components/Slash.icon";

enum IconType {
  MagnifyingGlass,
  Plus,
  ArrowUp,
  Slash,
  Globe,
  Chevron,
  Location,
  Calendar,
  Clock,
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
    case IconType.Globe:
      return GlobeIcon;
    case IconType.Chevron:
      return ChevronIcon;
    case IconType.Location:
      return LocationIcon;
    case IconType.Calendar:
      return CalendarIcon;
    case IconType.Clock:
      return ClockIcon;
  }
}

const Icon = ({ type, ...props }: { type: IconType } & IconProps) => {
  const Component = getIconComponent(type);
  return Component ? <Component {...(props as IconProps)} /> : null;
};

export default Icon;
export { IconType };
