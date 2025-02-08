import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@repo/ui/styles/globals.css";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/providers/tanstack-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "@/providers/session-provider";
import { ModalProvider } from "@/providers/modal-provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juba Hospitality",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>
      <SessionProvider>
        <html lang="en">
          <body
            className={`${poppins.className}  antialiased`}
            suppressHydrationWarning={true}
          >
            <div className="pt-[80px] relative">

              {children}
            </div>
            <Toaster
              toastOptions={{
                className: "text-sm capitalize",
              }}
            />
            <ReactQueryDevtools initialIsOpen={false} />
            <ModalProvider />
          </body>
        </html>
      </SessionProvider>
    </TanstackProvider>
  );
}
