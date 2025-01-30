import { cn } from "@repo/ui/lib/utils";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
};

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div>
      <h2 className={cn("section__title")}>{title}</h2>
      <p className={cn("section__subtitle")}>{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
