import type { ReactNode } from "react";
import { PortalSidebar } from "./PortalSidebar";

type PortalShellProps = {
  children: ReactNode;
};

/**
 * Top-level portal layout — sidebar nav on the left, scrollable content area
 * on the right. The sidebar is hidden on mobile; a mobile drawer will be
 * added when authentication is implemented.
 */
export function PortalShell({ children }: PortalShellProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Desktop sidebar — hidden below lg breakpoint */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-10 lg:w-64">
        <PortalSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
