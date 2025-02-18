"use client";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getBreadCrumb } from "@repo/ui/lib/utils";
import { SidebarTrigger, useSidebar } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";
import { NavUser } from "../sidebar/nav-user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";

type Props = {
  children: React.ReactNode;
};

export const DashboardProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const breadCrumb = getBreadCrumb(pathname);
  const { state } = useSidebar();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center jubtify-between gap-2  mt-4 mx-6 bg-white border p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1 " />
            <Separator orientation="vertical" className="mr-2 h-4 " />
            <Breadcrumb>
              <BreadcrumbList>
                {breadCrumb.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        className=" capitalize"
                        asChild={item.link ? true : false}
                      >
                        {item.link ? (
                          <Link href={item.link}>{item.label}</Link>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadCrumb.length - 1 && (
                      <BreadcrumbSeparator className="" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <NavUser
              user={{
                name: "Profile NA",
                email: "",
                avatar: "/avatars/shadcn.jpg",
              }}
            />
          </PopoverTrigger>
          <PopoverContent></PopoverContent>
        </Popover>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-6 pt-4">{children}</div>
    </>
  );
};
