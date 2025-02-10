import { Button, ButtonProps } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import React from "react";
import { ImSpinner7 } from "react-icons/im";

type Props = {
  label: string;
  icon?: React.ReactNode;
  pending: boolean;
  className?: string;
} & ButtonProps;

const SubmitButton = ({ className, label, icon, pending, ...props }: Props) => {
  return (
    <Button className={cn(className, "relative")} {...props}>
      <ImSpinner7
        className={cn("invisible absolute", pending && "visible animate-spin")}
      />
      <span className={cn("", pending && "invisible")}>
        {icon}
        {label}
      </span>
    </Button>
  );
};

export default SubmitButton;
