import SiteLogo from "@/components/logo";
import { SocialMediaWidget } from "./social-widget";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  className?: string;
  description?: string;
};

export const AboutWidget = ({ className, description }: Props) => {
  return (
    <div className={cn("space-y-4", className)}>
      <SiteLogo type="dark" />
      <p className="text-default text-wrap text-gray-600">{description}</p>
      <SocialMediaWidget />
    </div>
  );
};
