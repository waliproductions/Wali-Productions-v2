import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Client Portal",
    template: "%s | Client Portal — Wali Productions",
  },
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {children}
    </div>
  );
}
