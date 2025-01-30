"use client";

import { PropsWithChildren, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@repo/ui/lib/utils";

type TProps = {
  defaultValue: string | number;
  data: {
    label: string;
    content: React.ReactNode;
  }[];
};

export const AnimgatedTabs = ({ defaultValue, data }: TProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <>
      <nav className="flex items-center shadow-md bg-white rounded-xl p-2">
        {data.map((item, i) => {
          return (
            <div
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                `px-4 py-2 relative text__large hover:text-primary cursor-pointer wie__transition__200 rounded-xl`,
                item.label == activeTab && "text-primary z-40"
              )}
            >
              <span className="relative z-40 text-lg"> {item.label}</span>

              {item.label == activeTab ? (
                <motion.div
                  className="h-full w-full bg-slate-300/50 absolute inset-0 rounded-xl z-10"
                  layoutId="underline"
                />
              ) : null}
            </div>
          );
        })}
      </nav>

      <AnimatedTabContent identifier={activeTab}>
        {data.find((item) => item.label == activeTab)?.content}
      </AnimatedTabContent>
    </>
  );
};

type Props = {
  identifier: string | number;
} & PropsWithChildren;
const AnimatedTabContent = ({ children, identifier }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={identifier}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mt-3 p-4 rounded-xl shadow-md bg-white">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};
