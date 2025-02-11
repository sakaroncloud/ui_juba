import React, { forwardRef, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import SubmitButton from "./submit-button";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  label: string;
} & PropsWithChildren;

interface FormFooterProps {
  className?: string;
  buttonLabel: string;
  pending: boolean;
  goBack?: {
    path: string;
  };
}

const FormFooter = forwardRef<HTMLDivElement, FormFooterProps>(
  ({ className, buttonLabel, pending, goBack }, ref) => {
    const router = useRouter();
    return (
      <div
        ref={ref}
        className={cn("flex justify-between gap-20 flex-1 py-3", className)}
      >
        {goBack && (
          <Button
            type="button"
            onClick={() => router.push(goBack.path)}
            variant={"outline"}
            className="space-x-3"
          >
            <ArrowLeftIcon className="size-4 " />
            <span> Go Back</span>
          </Button>
        )}

        <SubmitButton type="submit" label={buttonLabel} pending={pending} />
      </div>
    );
  }
);

FormFooter.displayName = "FormFooter";

export { FormFooter };
