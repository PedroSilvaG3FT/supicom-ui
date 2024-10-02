import Each from "./app-each";
import { Star } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";

interface IProps {
  count?: number;
  fill?: string;
  className?: string;
  starClassName?: string;
}

export default function AppStarsLabel(props: IProps) {
  const { count = 5, fill = "foreground", className, starClassName } = props;

  return (
    <nav className={cn("flex items-center", className)}>
      <Each
        data={Array.from({ length: count })}
        render={() => (
          <Star fill={fill} className={cn("w-4 h-4", starClassName)} />
        )}
      />
    </nav>
  );
}
