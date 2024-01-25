"use client";
import { DefaultContextProvider } from "@/context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <DefaultContextProvider>{children}</DefaultContextProvider>;
}
