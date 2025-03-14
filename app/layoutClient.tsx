"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./dark-mode";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ClientOnly>
        <ThemeWrapper>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
          <ModeToggle />
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </ThemeWrapper>
      </ClientOnly>
    </ThemeProvider>
  );
}

// Prevents hydration errors by ensuring the component only renders on the client
function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}

// Ensures correct theme styling
function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return <div data-theme={theme}>{children}</div>;
}
