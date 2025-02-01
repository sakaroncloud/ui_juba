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
import { useModal } from "@/hooks/useModal";
import { Menu, User } from "lucide-react";



export const SignInSheet = () => {
  const [enableRegisterForm, setEnableRegisterForm] = useState<boolean>(false);
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "sign-in-sheet";

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetTrigger className="cursor-pointer" asChild>
        <div

          className="flex items-center hover:shadow-md gap-2 hover:text-primary wie__transition__200 shadow rounded-3xl border border-gray-200 py-3 px-4"
        >
          <Menu className="size-5" />
          <User className="size-5" />
        </div>
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
          <SignInForm />
        ) : (
          <SignUpForm />
        )}
        <p className="text-xs mt-4">
          By clicking on {enableRegisterForm ? "Sign Up" : "Login"}, I accept
          the Terms & Conditions & Privacy Policy
        </p>
      </SheetContent>
    </Sheet>
  );
};
