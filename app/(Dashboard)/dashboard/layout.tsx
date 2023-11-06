"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/dist/client/link";
import useSyncUser from "../utils/syncUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSyncUser();
  return (
    <>
      <main className="flex bg-slate-950">
        <div className="flex-none">
          <div className="flex h-screen w-60 grow flex-col gap-y-2 overflow-y-auto bg-black/20 p-3 text-xs ring-1 ring-white/10">
            <UserButton afterSignOutUrl="/" />
            <nav className="flex flex-1 flex-col gap-y-0.5">
              <li>
                <Link
                  href="/dashboard"
                  className="flex flex-col rounded-lg px-3 py-1.5 hover:bg-white/10"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/contacts"
                  className="flex flex-col rounded-lg px-3 py-1.5 hover:bg-white/10"
                >
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="flex flex-col rounded-lg px-3 py-1.5 hover:bg-white/10"
                >
                  Settings
                </Link>
              </li>
            </nav>
          </div>
        </div>
        <div className="flex-auto flex-col content-center p-5">{children}</div>
      </main>
    </>
  );
}
