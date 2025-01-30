"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import SignInForm from "./sign-in-form";
import { useState } from "react";
import SignUpForm from "./sign-up-form";

type Props = {
  children: React.ReactNode;
};

export const SignInSheet = ({ children }: Props) => {
  const [enableRegisterForm, setEnableRegisterForm] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer" asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle>{!enableRegisterForm ? "Login" : "Sign Up"}</SheetTitle>
          <div className="text-sm">
            <span>
              Or{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => setEnableRegisterForm(!enableRegisterForm)}
              >
                {!enableRegisterForm
                  ? "create a account"
                  : "login to your account"}
              </span>
            </span>
          </div>
        </SheetHeader>
        {!enableRegisterForm ? (
          <SignInForm setOpen={setOpen} />
        ) : (
          <SignUpForm setOpen={setOpen} />
        )}
        <p className="text-xs mt-4">
          By clicking on {enableRegisterForm ? "Sign Up" : "Login"}, I accept
          the Terms & Conditions & Privacy Policy
        </p>
      </SheetContent>
    </Sheet>
  );
};
